"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useCallback, useEffect, useState } from "react";

import type { Character } from "@/lib/models";

import { BottomMenu } from "@/components/BottomMenu";
import { AuthModal } from "@/components/home/AuthModal";
import { CharacterPanel } from "@/components/home/CharacterPanel";
import { siteNavLinks } from "@/components/home/constants";
import { LandingSections } from "@/components/home/LandingSections";
import { SiteNavigation } from "@/components/home/SiteNavigation";
import { defaultSpiritId } from "@/lib/characterSpirits";
import { defaultSprite, defaultSpriteColor } from "@/lib/characterSpriteOptions";
import { getJSON, postJSON } from "@/lib/clientApi";

type AuthResult = { id: string; email: string };

type CharacterListResponse = {
  characters: Character[];
};

type SessionStateResponse = {
  ownerId: string;
  characterId: string;
  map: string;
  position: { x: number; y: number };
};

type ModalView = "register" | "login" | null;

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [registerData, setRegisterData] = useState({ email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [authFeedback, setAuthFeedback] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [characterForm, setCharacterForm] = useState({
    name: "",
    sprite: defaultSprite,
    spriteColor: defaultSpriteColor,
    spiritId: defaultSpiritId
  });
  const [characterFeedback, setCharacterFeedback] = useState<string | null>(null);
  const [refreshingCharacters, setRefreshingCharacters] = useState(false);
  const [modalView, setModalView] = useState<ModalView>(null);
  const [lastRoute, setLastRoute] = useState<string | null>(null);
  type SessionUser = {
    id?: string | null;
    email?: string | null;
    name?: string | null;
  };
  const sessionUser = session?.user as SessionUser | undefined;
  const ownerId = sessionUser?.id ?? "";
  const userEmail = sessionUser?.email ?? "";
  const isAuthenticated = Boolean(ownerId);

  const characterLimitReached = characters.length >= 4;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateFromStorage = () => {
      setLastRoute(window.localStorage.getItem("lastRoute"));
    };
    updateFromStorage();
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "lastRoute") {
        setLastRoute(event.newValue);
      }
    };
    const handleCustom = (event: Event) => {
      const detail = (event as CustomEvent<string | null>).detail;
      setLastRoute(detail ?? window.localStorage.getItem("lastRoute"));
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("lastRouteChange", handleCustom as EventListener);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("lastRouteChange", handleCustom as EventListener);
    };
  }, []);

  const refreshCharacters = useCallback(
    async (targetOwnerId: string) => {
      setRefreshingCharacters(true);
      setCharacterFeedback(null);
      try {
        const response = await getJSON<CharacterListResponse>(`/api/character/get?ownerId=${targetOwnerId}`);
        setCharacters(response.characters);
        if (response.characters.length === 0) {
          setSelectedCharacter("");
        } else {
          setSelectedCharacter((current) => {
            if (current && response.characters.find((char) => char._id === current)) {
              return current;
            }
            return response.characters[0]._id ?? "";
          });
        }
      } catch (err) {
        setCharacters([]);
        setSelectedCharacter("");
        setCharacterFeedback(getMessage(err));
      } finally {
        setRefreshingCharacters(false);
      }
    },
    []
  );

  const syncSessionCharacter = useCallback(async () => {
    try {
      const sessionState = await getJSON<SessionStateResponse>("/api/session/state");
      if (sessionState.characterId) {
        setSelectedCharacter(sessionState.characterId);
      }
      if (sessionState.ownerId && !ownerId) {
        void refreshCharacters(sessionState.ownerId);
      }
    } catch {
      // sessão ainda não definida
    }
  }, [ownerId, refreshCharacters]);

  useEffect(() => {
    void syncSessionCharacter();
  }, [syncSessionCharacter]);

  useEffect(() => {
    if (!ownerId) {
      setCharacters([]);
      setSelectedCharacter("");
      return;
    }
    void refreshCharacters(ownerId);
    void syncSessionCharacter();
  }, [ownerId, refreshCharacters, syncSessionCharacter]);

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingAuth(true);
    setAuthFeedback(null);
    try {
      const result = await postJSON<AuthResult>("/api/auth/register", registerData);
      setAuthFeedback(`Conta criada: ${result.email}`);
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: registerData.email,
        password: registerData.password
      });
      if (loginResult?.error) {
        setAuthFeedback(`Conta criada, mas o login falhou: ${loginResult.error}`);
      } else {
        setModalView(null);
        setRegisterData({ email: "", password: "" });
        void syncSessionCharacter();
      }
    } catch (err) {
      setAuthFeedback(getMessage(err));
    } finally {
      setLoadingAuth(false);
    }
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingAuth(true);
    setAuthFeedback(null);
    try {
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: loginData.email,
        password: loginData.password
      });
      if (loginResult?.error) {
        setAuthFeedback(loginResult.error ?? "Credenciais inválidas");
      } else {
        setAuthFeedback(`Login efetuado para ${loginData.email}`);
        setModalView(null);
        setLoginData({ email: "", password: "" });
        void syncSessionCharacter();
      }
    } catch (err) {
      setAuthFeedback(getMessage(err));
    } finally {
      setLoadingAuth(false);
    }
  }

  async function handleCreateCharacter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ownerId) {
      setCharacterFeedback("Faça login antes de criar personagens.");
      return;
    }
    setCharacterFeedback(null);
    try {
      await postJSON<Character>("/api/character/create", {
        ownerId,
        name: characterForm.name,
        sprite: characterForm.sprite,
        spriteColor: characterForm.spriteColor,
        spiritId: characterForm.spiritId
      });
      setCharacterForm({
        name: "",
        sprite: defaultSprite,
        spriteColor: defaultSpriteColor,
        spiritId: defaultSpiritId
      });
      await refreshCharacters(ownerId);
      setCharacterFeedback("Personagem criado.");
    } catch (err) {
      setCharacterFeedback(getMessage(err));
    }
  }

  async function enterCity() {
    if (!ownerId || !selectedCharacter) {
      setCharacterFeedback("Selecione um personagem para continuar.");
      return;
    }
    try {
      await postJSON("/api/session/select", { characterId: selectedCharacter, map: "cidadecentral" });
      if (typeof window !== "undefined") {
        window.localStorage.setItem("lastRoute", "/play");
        window.dispatchEvent(new CustomEvent("lastRouteChange", { detail: "/play" }));
      }
      router.push("/play");
    } catch (err) {
      setCharacterFeedback(getMessage(err));
    }
  }

  const handleCharacterFormChange = (patch: Partial<typeof characterForm>) => {
    setCharacterForm((previous) => ({ ...previous, ...patch }));
  };

  const handleContinueRoute = (route: string) => {
    if (route) router.push(route);
  };

  return (
    <div className="flex flex-col gap-10">
      <SiteNavigation links={siteNavLinks} />
      {!isAuthenticated && (
        <LandingSections
          onRequestLogin={() => setModalView("login")}
          onRequestRegister={() => setModalView("register")}
          feedback={authFeedback}
        />
      )}

      {isAuthenticated && (
        <CharacterPanel
          userEmail={userEmail}
          characters={characters}
          selectedCharacter={selectedCharacter}
          onSelectCharacter={setSelectedCharacter}
          onEnterCity={enterCity}
          refreshing={refreshingCharacters}
          characterFeedback={characterFeedback}
          characterForm={characterForm}
          onChangeCharacterForm={handleCharacterFormChange}
          onCreateCharacter={handleCreateCharacter}
          characterLimitReached={characterLimitReached}
          lastRoute={lastRoute}
          onContinueLastRoute={handleContinueRoute}
        />
      )}

      {isAuthenticated && <BottomMenu />}

      {modalView && (
        <AuthModal
          view={modalView}
          onClose={() => setModalView(null)}
          registerData={registerData}
          setRegisterData={setRegisterData}
          loginData={loginData}
          setLoginData={setLoginData}
          loading={loadingAuth}
          onRegister={handleRegister}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Ação não concluída";
}

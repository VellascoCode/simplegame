"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { getJSON, postJSON } from "@/lib/clientApi";
import type { Character } from "@/lib/models";
import { BottomMenu } from "@/components/BottomMenu";
import { getCharacterSpriteConfig } from "@/lib/characterSprites";

const spriteOptions = ["default", "guerreiro", "arqueira", "mago"];

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

const roadmapSteps = [
  "Etapa 1 — Autenticação + personagens",
  "Etapa 2 — Cidade com Phaser",
  "Etapa 3 — Movimentação básica",
  "Etapa 4 — Casa / Fazenda / Floresta / Lojas",
  "Etapa 5 — Inventário",
  "Etapa 6 — Lista de online",
  "Etapa 7 — Chat global"
] as const;

const featureHighlights = [
  {
    title: "Fluxo fixo",
    description: "Nenhum atalho fora do README. Tudo acontece pelo servidor."
  },
  {
    title: "Tiles 32×32",
    description: "`tile1.png` e `tile2.png` (100×100) reamostrados no Phaser e no editor."
  },
  {
    title: "Personagens persistentes",
    description: "Até 4 slots por usuário. Sempre escolha um antes de clicar em Jogar."
  }
] as const;

const loreSections = [
  {
    title: "Camadas do mapa",
    content:
      "Cada mapa usa camadas de piso, detalhes e construções (tile1 até tile6). O editor salva diretamente no servidor, garantindo que o Phaser carregue o JSON correto."
  },
  {
    title: "Estruturas obrigatórias",
    content:
      "Cidade, casa, fazenda, floresta e lojas possuem rotas e telas dedicadas. Todos os fluxos passam pelas APIs listadas no README."
  },
  {
    title: "Rotas de verificação",
    content:
      "As rotas `/api/check/*` seguem ativas para validar o ambiente rapidamente (auth, character, online, chat, inventory, house, farm, forest, shops)."
  }
] as const;

const showcaseClasses = [
  {
    name: "Guerreiro Azul",
    sprite: "/sprites/warriorblue/idle.png",
    role: "Frente de batalha",
    description: "Ataques corpo a corpo. Base para todos os testes de HUD e combate."
  },
  {
    name: "Lanceiro NPC",
    sprite: "/sprites/lancer/walk.png",
    role: "Hostil",
    description: "NPC experimental que caça o jogador e dispara eventos de XP/dano."
  },
  {
    name: "Explorador",
    sprite: "/tilesets/tile2.png",
    role: "Economia",
    description: "Placeholder para conectarmos cidade, casa, fazenda e floresta."
  }
] as const;

const roadmapTiles = [
  {
    title: "Sessões seguras",
    subtitle: "ownerId",
    description: "Cookies HTTP-only + Mongo guardam o dono logado e o personagem escolhido."
  },
  {
    title: "Seleção obrigatória",
    subtitle: "character",
    description: "Até 4 personagens por conta — sempre escolha um antes de abrir a cidade."
  },
  {
    title: "HUD dinâmico",
    subtitle: "painéis slide",
    description: "Inventário, chat, conta e configurações usam os mesmos dados reais das rotas API."
  }
] as const;

const assetHighlights = [
  { label: "Tilesets", value: "tile1.png até tile6.png" },
  { label: "Sprites", value: "warriorblue, lancer e futuros NPCs" },
  { label: "GUI", value: "Botões /public/gui + ícones personalizados" },
  { label: "Mapas", value: "city, house, farm, forest (JSON)" }
] as const;

const siteNavLinks = [
  {
    id: "portal",
    label: "Portal do jogo",
    description: "Notícias, roadmap e changelog",
    icon: "/icons/viewmap.png"
  },
  {
    id: "market",
    label: "Marketplace",
    description: "Itens oficiais e player market",
    icon: "/icons/playermarket.png"
  },
  {
    id: "wiki",
    label: "Wiki",
    description: "Guias de mapas, atributos e crafting",
    icon: "/icons/achievements.png"
  },
  {
    id: "forum",
    label: "Fórum",
    description: "Discussões gerais e suporte",
    icon: "/icons/chat.png"
  },
  {
    id: "achievements",
    label: "Arquivamentos",
    description: "Coleção de conquistas e títulos",
    icon: "/icons/achievements.png"
  }
] as const;

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [registerData, setRegisterData] = useState({ email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [authFeedback, setAuthFeedback] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [characterForm, setCharacterForm] = useState({ name: "", sprite: spriteOptions[0] });
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

  useEffect(() => {
    void syncSessionCharacter();
  }, []);

  useEffect(() => {
    if (!ownerId) {
      setCharacters([]);
      setSelectedCharacter("");
      return;
    }
    void refreshCharacters(ownerId);
    void syncSessionCharacter();
  }, [ownerId]);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
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

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
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

  async function handleCreateCharacter(event: React.FormEvent<HTMLFormElement>) {
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
        sprite: characterForm.sprite
      });
      setCharacterForm({ name: "", sprite: spriteOptions[0] });
      await refreshCharacters(ownerId);
      setCharacterFeedback("Personagem criado.");
    } catch (err) {
      setCharacterFeedback(getMessage(err));
    }
  }

  async function refreshCharacters(ownerId: string) {
    setRefreshingCharacters(true);
    setCharacterFeedback(null);
    try {
      const response = await getJSON<CharacterListResponse>(`/api/character/get?ownerId=${ownerId}`);
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
  }

  async function enterCity() {
    if (!ownerId || !selectedCharacter) {
      setCharacterFeedback("Selecione um personagem para continuar.");
      return;
    }
    try {
      await postJSON("/api/session/select", { characterId: selectedCharacter });
      if (typeof window !== "undefined") {
        window.localStorage.setItem("lastRoute", "/play");
        window.dispatchEvent(new CustomEvent("lastRouteChange", { detail: "/play" }));
      }
      router.push("/play");
    } catch (err) {
      setCharacterFeedback(getMessage(err));
    }
  }

  async function syncSessionCharacter() {
    try {
      const session = await getJSON<SessionStateResponse>("/api/session/state");
      if (session.characterId) {
        setSelectedCharacter(session.characterId);
      }
      if (session.ownerId && !ownerId) {
        void refreshCharacters(session.ownerId);
      }
    } catch {
      // sessão ainda não definida
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <nav
        className="flex flex-wrap gap-4 rounded-[32px] border border-white/10 bg-black/40 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
        aria-label="Seções do portal"
      >
        {siteNavLinks.map((link) => (
          <button
            key={link.id}
            type="button"
            className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-left text-amber-100 transition hover:bg-white/10"
          >
            <img src={link.icon} alt="" className="h-10 w-10 object-contain" />
            <div>
              <p className="text-sm font-semibold leading-tight">{link.label}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-amber-100/70">{link.description}</p>
            </div>
          </button>
        ))}
      </nav>
      {!isAuthenticated && (
        <>
          <section className="rounded-[32px] border border-[#7a4b1a] bg-gradient-to-br from-[#4a2c19] to-[#2b160b] p-10 text-amber-100 shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-300/80">MVP — Mundo 2D Spinazzi</p>
                <h1 className="font-display text-3xl text-amber-50">Landing oficial do projeto</h1>
                <p className="text-amber-100/80">
                  Siga o README sem atalhos: registre-se, crie até quatro personagens e entre direto no mapa da cidade
                  (Phaser + inventário + online + chat).
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#f7c681] to-[#c16a27] px-8 py-3 font-bold uppercase tracking-wider text-[#341507] shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition hover:brightness-110"
                    type="button"
                    onClick={() => setModalView("register")}
                  >
                    Registrar
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-full border border-amber-300/60 px-8 py-3 font-bold uppercase tracking-wider text-amber-100 transition hover:bg-amber-200/10"
                    type="button"
                    onClick={() => setModalView("login")}
                  >
                    Login
                  </button>
                </div>
                {authFeedback && <p className="text-amber-200">{authFeedback}</p>}
              </div>
              <div className="rounded-3xl border border-[#c6853e] bg-[#2a150a]/80 p-6">
                <h3 className="text-lg font-semibold text-amber-100">Roadmap obrigatório</h3>
                <ul className="mt-4 space-y-2 text-sm text-amber-100/80">
                  {roadmapSteps.map((step) => (
                    <li key={step} className="flex items-center gap-3">
                      <span className="inline-flex h-3 w-3 rounded-full bg-amber-400" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="card">
            <h3 className="text-xl font-semibold text-amber-100">Por que seguir este layout?</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {featureHighlights.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-[#a1652c] bg-[#311909]/70 p-5 text-sm text-amber-100/85 shadow-inner"
                >
                  <h4 className="text-lg font-semibold text-amber-100">{feature.title}</h4>
                  <p className="mt-2">{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="card">
            <h3 className="text-xl font-semibold text-amber-100">Seções obrigatórias do MVP</h3>
            <p className="text-amber-100/80">
              As regras abaixo resumem o README e devem ser respeitadas em qualquer implementação.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {loreSections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-2xl border border-[#a1652c] bg-[#2e170c] p-5 text-sm text-amber-100/85 shadow-inner"
                >
                  <h4 className="text-lg font-semibold text-amber-100">{section.title}</h4>
                  <p className="mt-2">{section.content}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="card">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-300/80">Tech + Stack</p>
                <h3 className="text-2xl font-bold text-amber-50">Mongo, Next.js e Phaser sincronizados</h3>
                <p className="text-amber-100/80">
                  Sessões seguras, personagens persistentes e HUD 100% ligado às APIs descritas no README.
                  Ideal para continuar o MVP sem improvisos.
                </p>
                <button className="button" type="button" onClick={() => setModalView("login")}>
                  Entrar após login
                </button>
              </div>
              <div className="rounded-[28px] border border-[#8b4f1f] bg-[#1d0d05]/80 p-6 text-sm text-amber-100/80">
                <p>Checklist rápido:</p>
                <ul className="mt-4 space-y-2 list-disc list-inside">
                  <li>Login usa NextAuth (Credentials) para definir o owner via JWT seguro.</li>
                  <li>Seleção de personagem chama `/api/session/select`.</li>
                  <li>Mapa lê `/api/session/state` antes de renderizar o Phaser.</li>
                  <li>Posição salva via `/api/session/position`.</li>
                  <li>Slots rápidos persistem em `/api/quickslots`.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="card">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-300/80">Assets e mapas</p>
                <h3 className="text-2xl font-bold text-amber-50">Tudo controlado pelo repositório</h3>
                <p className="text-amber-100/80">
                  Os mapas (JSON) e os sprites vivem em `/public`. O editor `/editor` usa o mesmo arquivo que o Phaser,
                  então qualquer ajuste em `map_city.json` é refletido imediatamente no jogo.
                </p>
                <ul className="space-y-2 text-sm text-amber-100/80">
                  {assetHighlights.map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="inline-flex h-2 w-2 rounded-full bg-amber-400" />
                      <span className="font-semibold text-amber-50">{item.label}:</span> {item.value}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[28px] border border-[#8b4f1f] bg-gradient-to-b from-[#3a1c0e] to-[#1a0a05] p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <img src="/tilesets/tile1.png" alt="Tile 1" className="rounded-2xl border border-[#653816] bg-[#120703] p-3" />
                  <img src="/sprites/warriorblue/walk.png" alt="Warrior" className="rounded-2xl border border-[#653816] bg-[#120703] p-3" />
                  <img src="/sprites/lancer/attack.png" alt="Lanceiro" className="rounded-2xl border border-[#653816] bg-[#120703] p-3" />
                  <img src="/gui/Banner_Orange.svg" alt="GUI" className="rounded-2xl border border-[#653816] bg-[#120703] p-3" />
                </div>
              </div>
            </div>
          </section>

          <section className="card">
            <h3 className="text-xl font-semibold text-amber-100">Personagens e NPCs em teste</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {showcaseClasses.map((hero) => (
                <article
                  key={hero.name}
                  className="rounded-2xl border border-[#8b4f1f] bg-[#1f0d05]/80 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-2xl bg-[#2b150b] p-2">
                      <img src={hero.sprite} alt={hero.name} className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">{hero.role}</p>
                      <h4 className="text-lg font-semibold text-amber-50">{hero.name}</h4>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-amber-100/80">{hero.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="card">
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="flex-1 space-y-4">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-300/80">Owner vs Character</p>
                <h3 className="text-2xl font-bold text-amber-50">Conta segura, personagens independentes</h3>
                <p className="text-amber-100/80">
                  Owner = a conta logada via email/senha (Mongo + NextAuth JWT). Character = cada avatar jogável
                  com XP, HP, inventário e posição próprios. A landing obriga escolher um character para habilitar o
                  botão “Jogar”, e a sessão `/api/session/*` garante que o estado continue após refresh ou troca de rota.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  {roadmapTiles.map((tile) => (
                    <article key={tile.title} className="rounded-2xl border border-[#8b4f1f] bg-[#1f0d05]/80 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-amber-300/60">{tile.subtitle}</p>
                      <h4 className="text-lg font-semibold text-amber-50">{tile.title}</h4>
                      <p className="text-sm text-amber-100/80">{tile.description}</p>
                    </article>
                  ))}
                </div>
              </div>
              <div className="flex-1 rounded-[32px] border border-[#70421a] bg-gradient-to-b from-[#3a1d0c] to-[#1a0a05] p-6 text-sm text-amber-100/80 shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Fluxo resumido</p>
                <ol className="mt-4 space-y-3 list-decimal list-inside">
                  <li>Owner faz login → NextAuth define a sessão e libera `/api/session/*`.</li>
                  <li>Seleciona um character → `/api/session/select` salva ownerId + characterId + mapa.</li>
                  <li>`/api/session/state` alimenta `/city` antes do Phaser inicializar.</li>
                  <li>Posição e quick slots persistem via `/api/session/position` e `/api/quickslots`.</li>
                </ol>
              </div>
            </div>
          </section>
        </>
      )}

      {isAuthenticated && (
        <section className="card">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-sm text-amber-100/70">Bem-vindo de volta</p>
              <h2 className="text-2xl font-bold text-amber-50">Minha Conta</h2>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              {lastRoute && (
                <button className="button" type="button" onClick={() => lastRoute && router.push(lastRoute)}>
                  Continuar em {lastRoute}
                </button>
              )}
              {authFeedback && <p className="text-amber-200">{authFeedback}</p>}
            </div>
          </header>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-[#a1652c] bg-[#2d160b]/80 p-5 shadow-inner">
              <h3 className="text-lg font-semibold text-amber-100">Dados do jogador</h3>
              <p>E-mail: {userEmail || "—"}</p>
              <p>Personagens: {characters.length} / 4</p>
              {refreshingCharacters && <p>Atualizando lista…</p>}
            </article>

            <article className="rounded-2xl border border-[#a1652c] bg-[#2d160b]/80 p-5 shadow-inner">
              <h3 className="text-lg font-semibold text-amber-100">Selecione quem vai jogar</h3>
              {characterFeedback && <p className="text-amber-200">{characterFeedback}</p>}
              <div className="grid gap-4 md:grid-cols-1">
                {characters.map((character) => {
                  const characterId = character._id ?? "";
                  const isSelected = selectedCharacter === characterId;
                  return (
                    <button
                      key={character._id ?? character.name}
                      type="button"
                      className={`rounded-2xl border border-[#9c5f29] bg-[#1d0d06]/70 p-4 text-left text-sm transition ${
                        isSelected ? "ring-2 ring-amber-400" : ""
                      }`}
                      onClick={() => characterId && setSelectedCharacter(characterId)}
                      disabled={!characterId}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`character-display ${getSpriteVariant(character.sprite)}`}
                          style={getPreviewStyle(character.sprite)}
                        />
                        <div className="flex flex-col gap-1">
                          <strong className="text-amber-50 text-lg">{character.name}</strong>
                          <span className="text-amber-100/75">
                            sprite {character.sprite} — nível {character.stats.level}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
                {characters.length === 0 && <p>Nenhum personagem criado.</p>}
              </div>
              <button className="button mt-4 w-full" type="button" onClick={enterCity} disabled={!selectedCharacter}>
                Jogar (ir para a cidade)
              </button>
            </article>

            <article className="rounded-2xl border border-[#a1652c] bg-[#2d160b]/80 p-5 shadow-inner">
              <h3 className="text-lg font-semibold text-amber-100">Criar personagem</h3>
              <form onSubmit={handleCreateCharacter}>
                <label htmlFor="character-name">Nome</label>
                <input
                  id="character-name"
                  required
                  minLength={3}
                  value={characterForm.name}
                  onChange={(event) => setCharacterForm((prev) => ({ ...prev, name: event.target.value }))}
                  disabled={characterLimitReached}
                />
                <label htmlFor="character-sprite">Sprite</label>
                <select
                  id="character-sprite"
                  value={characterForm.sprite}
                  onChange={(event) => setCharacterForm((prev) => ({ ...prev, sprite: event.target.value }))}
                  disabled={characterLimitReached}
                >
                  {spriteOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <button className="button" disabled={characterLimitReached}>
                  {characterLimitReached ? "Limite atingido" : "Criar personagem"}
                </button>
              </form>
            </article>
          </div>
        </section>
      )}

      {isAuthenticated && <BottomMenu />}

      {modalView && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => setModalView(null)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            {modalView === "register" ? (
              <ModalRegister registerData={registerData} setRegisterData={setRegisterData} loading={loadingAuth} onSubmit={handleRegister} />
            ) : (
              <ModalLogin loginData={loginData} setLoginData={setLoginData} loading={loadingAuth} onSubmit={handleLogin} />
            )}
            <button className="modal-close" onClick={() => setModalView(null)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ModalRegister({
  registerData,
  setRegisterData,
  loading,
  onSubmit
}: {
  registerData: { email: string; password: string };
  setRegisterData: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>;
  loading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="modal-section">
      <h3 className="text-xl font-semibold text-amber-100">Registrar conta</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="register-email">E-mail</label>
        <input
          id="register-email"
          type="email"
          required
          value={registerData.email}
          onChange={(event) => setRegisterData((prev) => ({ ...prev, email: event.target.value }))}
        />
        <label htmlFor="register-password">Senha</label>
        <input
          id="register-password"
          type="password"
          required
          minLength={6}
          value={registerData.password}
          onChange={(event) => setRegisterData((prev) => ({ ...prev, password: event.target.value }))}
        />
        <button className="button" disabled={loading}>
          Registrar
        </button>
      </form>
    </div>
  );
}

function ModalLogin({
  loginData,
  setLoginData,
  loading,
  onSubmit
}: {
  loginData: { email: string; password: string };
  setLoginData: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>;
  loading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="modal-section">
      <h3 className="text-xl font-semibold text-amber-100">Login</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="login-email">E-mail</label>
        <input
          id="login-email"
          type="email"
          required
          value={loginData.email}
          onChange={(event) => setLoginData((prev) => ({ ...prev, email: event.target.value }))}
        />
        <label htmlFor="login-password">Senha</label>
        <input
          id="login-password"
          type="password"
          required
          value={loginData.password}
          onChange={(event) => setLoginData((prev) => ({ ...prev, password: event.target.value }))}
        />
        <button className="button" disabled={loading}>
          Entrar
        </button>
      </form>
    </div>
  );
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Ação não concluída";
}

function getSpriteVariant(sprite: string) {
  if (sprite === "guerreiro") return "variant-guerreiro";
  if (sprite === "arqueira") return "variant-arqueira";
  if (sprite === "mago") return "variant-mago";
  return "";
}

function getPreviewStyle(sprite: string) {
  const config = getCharacterSpriteConfig(sprite);
  const idle = config.idle;
  const duration = idle.frames / idle.frameRate;
  return {
    backgroundImage: `url(${idle.sheet})`,
    backgroundSize: `${idle.frames * 100}% 100%`,
    animation: `character-walk ${duration}s steps(${idle.frames}) infinite`
  };
}

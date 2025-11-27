import type { Dispatch, FormEvent, SetStateAction } from "react";

import { useTheme } from "@/components/ThemeProvider";
import { WoodenButton, WoodenInput } from "@/components/UniversalUi";

type Credentials = { email: string; password: string };

interface AuthModalProps {
  view: "register" | "login";
  onClose: () => void;
  registerData: Credentials;
  setRegisterData: Dispatch<SetStateAction<Credentials>>;
  loginData: Credentials;
  setLoginData: Dispatch<SetStateAction<Credentials>>;
  loading: boolean;
  onRegister: (event: FormEvent<HTMLFormElement>) => Promise<void> | void;
  onLogin: (event: FormEvent<HTMLFormElement>) => Promise<void> | void;
}

export function AuthModal({
  view,
  onClose,
  registerData,
  setRegisterData,
  loginData,
  setLoginData,
  loading,
  onRegister,
  onLogin
}: AuthModalProps) {
  const { theme } = useTheme();

  const getCardClass = () => {
    if (theme === "kawaii") return "bg-white/95 border-pink-300";
    if (theme === "royal-medieval") return "bg-amber-900/90 border-amber-700";
    return "bg-stone-900/95 border-amber-900/30";
  };

  const getTitleClass = () => {
    if (theme === "kawaii") return "text-pink-800";
    if (theme === "royal-medieval") return "text-amber-100";
    return "text-amber-200";
  };

  const getButtonVariant = () => {
    if (theme === "kawaii") return "wood";
    if (theme === "royal-medieval") return "sand";
    return "wood";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={() => onClose()}>
      <div className={`relative w-full max-w-md rounded-2xl p-6 shadow-2xl ${getCardClass()}`} onClick={(event) => event.stopPropagation()}>
        {view === "register" ? (
          <RegisterForm
            data={registerData}
            setData={setRegisterData}
            loading={loading}
            onSubmit={onRegister}
            titleClass={getTitleClass()}
            buttonVariant={getButtonVariant()}
          />
        ) : (
          <LoginForm
            data={loginData}
            setData={setLoginData}
            loading={loading}
            onSubmit={onLogin}
            titleClass={getTitleClass()}
            buttonVariant={getButtonVariant()}
          />
        )}
        <button
          className="absolute top-4 right-4 text-2xl font-bold text-inherit hover:scale-110 transition-transform"
          onClick={() => onClose()}
          aria-label="Fechar"
        >
          ×
        </button>
      </div>
    </div>
  );
}

type AuthFormProps = {
  data: Credentials;
  setData: Dispatch<SetStateAction<Credentials>>;
  loading: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> | void;
  titleClass: string;
  buttonVariant: "wood" | "sand" | "secondary" | "danger" | "redRoyal" | "blueRoyal";
};

const RegisterForm = ({ data, setData, loading, onSubmit, titleClass, buttonVariant }: AuthFormProps) => (
  <div className="space-y-4">
    <h3 className={`text-xl font-semibold ${titleClass}`}>Registrar conta</h3>
    <form
      onSubmit={(event) => {
        void onSubmit(event);
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="register-email" className={`block mb-2 ${titleClass}`}>E-mail</label>
        <WoodenInput
          value={data.email}
          onChange={(value) => setData((prev) => ({ ...prev, email: value }))}
          placeholder="seu@email.com"
        />
      </div>
      <div>
        <label htmlFor="register-password" className={`block mb-2 ${titleClass}`}>Senha</label>
        <WoodenInput
          value={data.password}
          onChange={(value) => setData((prev) => ({ ...prev, password: value }))}
          placeholder="Mínimo 6 caracteres"
        />
      </div>
      <WoodenButton
        label={loading ? "Processando..." : "Registrar"}
        variant={buttonVariant}
        disabled={loading}
        fullWidth
      />
    </form>
  </div>
);

const LoginForm = ({ data, setData, loading, onSubmit, titleClass, buttonVariant }: AuthFormProps) => (
  <div className="space-y-4">
    <h3 className={`text-xl font-semibold ${titleClass}`}>Login</h3>
    <form
      onSubmit={(event) => {
        void onSubmit(event);
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="login-email" className={`block mb-2 ${titleClass}`}>E-mail</label>
        <WoodenInput
          value={data.email}
          onChange={(value) => setData((prev) => ({ ...prev, email: value }))}
          placeholder="seu@email.com"
        />
      </div>
      <div>
        <label htmlFor="login-password" className={`block mb-2 ${titleClass}`}>Senha</label>
        <WoodenInput
          value={data.password}
          onChange={(value) => setData((prev) => ({ ...prev, password: value }))}
          placeholder="Sua senha"
        />
      </div>
      <WoodenButton
        label={loading ? "Entrando..." : "Entrar"}
        variant={buttonVariant}
        disabled={loading}
        fullWidth
      />
    </form>
  </div>
);
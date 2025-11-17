import type { Dispatch, FormEvent, SetStateAction } from "react";

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
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => onClose()}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        {view === "register" ? (
          <RegisterForm data={registerData} setData={setRegisterData} loading={loading} onSubmit={onRegister} />
        ) : (
          <LoginForm data={loginData} setData={setLoginData} loading={loading} onSubmit={onLogin} />
        )}
        <button className="modal-close" onClick={() => onClose()}>
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
};

const RegisterForm = ({ data, setData, loading, onSubmit }: AuthFormProps) => (
  <div className="modal-section">
    <h3 className="text-xl font-semibold text-amber-100">Registrar conta</h3>
    <form
      onSubmit={(event) => {
        void onSubmit(event);
      }}
    >
      <label htmlFor="register-email">E-mail</label>
      <input id="register-email" type="email" required value={data.email} onChange={(event) => setData((prev) => ({ ...prev, email: event.target.value }))} />
      <label htmlFor="register-password">Senha</label>
      <input
        id="register-password"
        type="password"
        required
        minLength={6}
        value={data.password}
        onChange={(event) => setData((prev) => ({ ...prev, password: event.target.value }))}
      />
      <button className="button" disabled={loading}>
        Registrar
      </button>
    </form>
  </div>
);

const LoginForm = ({ data, setData, loading, onSubmit }: AuthFormProps) => (
  <div className="modal-section">
    <h3 className="text-xl font-semibold text-amber-100">Login</h3>
    <form
      onSubmit={(event) => {
        void onSubmit(event);
      }}
    >
      <label htmlFor="login-email">E-mail</label>
      <input id="login-email" type="email" required value={data.email} onChange={(event) => setData((prev) => ({ ...prev, email: event.target.value }))} />
      <label htmlFor="login-password">Senha</label>
      <input id="login-password" type="password" required value={data.password} onChange={(event) => setData((prev) => ({ ...prev, password: event.target.value }))} />
      <button className="button" disabled={loading}>
        Entrar
      </button>
    </form>
  </div>
);

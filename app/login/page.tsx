"use client";

import { useState } from "react";
import { postJSON } from "@/lib/clientApi";

type AuthResult = { id: string; email: string };

export default function LoginPage() {
  const [registerData, setRegisterData] = useState({ email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      const result = await postJSON<AuthResult>("/api/auth/register", registerData);
      setFeedback(`Usuário registrado: ${result.email}`);
    } catch (err) {
      setFeedback(getMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      const result = await postJSON<AuthResult>("/api/auth/login", loginData);
      setFeedback(`Login efetuado: ${result.email} (${result.id})`);
    } catch (err) {
      setFeedback(getMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="card">
        <h2>Etapa 1 — Autenticação</h2>
        <p>Crie uma conta ou acesse com seu e-mail e senha.</p>
        {feedback && <p>{feedback}</p>}
      </div>
      <div className="grid">
        <div className="card">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <label htmlFor="register-email">E-mail</label>
            <input
              id="register-email"
              type="email"
              required
              value={registerData.email}
              onChange={(event) =>
                setRegisterData((prev) => ({ ...prev, email: event.target.value }))
              }
            />
            <label htmlFor="register-password">Senha</label>
            <input
              id="register-password"
              type="password"
              required
              minLength={6}
              value={registerData.password}
              onChange={(event) =>
                setRegisterData((prev) => ({ ...prev, password: event.target.value }))
              }
            />
            <button className="button" disabled={loading}>
              Registrar
            </button>
          </form>
        </div>
        <div className="card">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <label htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              type="email"
              required
              value={loginData.email}
              onChange={(event) =>
                setLoginData((prev) => ({ ...prev, email: event.target.value }))
              }
            />
            <label htmlFor="login-password">Senha</label>
            <input
              id="login-password"
              type="password"
              required
              value={loginData.password}
              onChange={(event) =>
                setLoginData((prev) => ({ ...prev, password: event.target.value }))
              }
            />
            <button className="button" disabled={loading}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Ação não concluída";
}

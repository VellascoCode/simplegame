"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

import { postJSON } from "@/lib/clientApi";

type AuthResult = { id: string; email: string };

export default function LoginPage() {
  const { theme } = useTheme();
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

  // Classes de fundo por tema
  const sectionClass = theme === "kawaii"
    ? "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
    : theme === "royal-medieval"
      ? "bg-gradient-to-br from-red-900 via-amber-900 to-orange-900"
      : "bg-gradient-to-br from-stone-950 via-stone-900 to-black";

  const cardClass = theme === "kawaii"
    ? "bg-white/90 border-pink-300 text-pink-800"
    : theme === "royal-medieval"
      ? "bg-amber-900/80 border-amber-700 text-amber-100"
      : "bg-stone-900/90 border-amber-800/30 text-amber-200";

  const buttonClass = theme === "kawaii"
    ? "button-kawaii"
    : theme === "royal-medieval"
      ? "button-royal"
      : "button-dark";

  return (
    <section className={`min-h-screen p-4 ${sectionClass}`}>
      <div className={`card rounded-xl p-6 shadow-xl border ${cardClass}`}>
        <h2 className="text-2xl font-bold mb-2">Etapa 1 — Autenticação</h2>
        <p className="opacity-90">Crie uma conta ou acesse com seu e-mail e senha.</p>
        {feedback && <p className="mt-3 p-2 bg-black/20 rounded border inline-block">{feedback}</p>}
      </div>
      <div className="grid gap-6 mt-6 max-w-4xl mx-auto md:grid-cols-2">
        <div className={`card rounded-xl p-6 shadow-xl border ${cardClass}`}>
          <h3 className="text-xl font-semibold mb-4">Registro</h3>
          <form
            onSubmit={(event) => {
              void handleRegister(event);
            }}
          >
            <label htmlFor="register-email" className="block mb-2">E-mail</label>
            <input
              id="register-email"
              type="email"
              required
              value={registerData.email}
              onChange={(event) =>
                setRegisterData((prev) => ({ ...prev, email: event.target.value }))
              }
              className="w-full p-2 mb-4 rounded border bg-black/20"
            />
            <label htmlFor="register-password" className="block mb-2">Senha</label>
            <input
              id="register-password"
              type="password"
              required
              minLength={6}
              value={registerData.password}
              onChange={(event) =>
                setRegisterData((prev) => ({ ...prev, password: event.target.value }))
              }
              className="w-full p-2 mb-4 rounded border bg-black/20"
            />
            <button className={`button w-full ${buttonClass}`} disabled={loading}>
              Registrar
            </button>
          </form>
        </div>
        <div className={`card rounded-xl p-6 shadow-xl border ${cardClass}`}>
          <h3 className="text-xl font-semibold mb-4">Login</h3>
          <form
            onSubmit={(event) => {
              void handleLogin(event);
            }}
          >
            <label htmlFor="login-email" className="block mb-2">E-mail</label>
            <input
              id="login-email"
              type="email"
              required
              value={loginData.email}
              onChange={(event) =>
                setLoginData((prev) => ({ ...prev, email: event.target.value }))
              }
              className="w-full p-2 mb-4 rounded border bg-black/20"
            />
            <label htmlFor="login-password" className="block mb-2">Senha</label>
            <input
              id="login-password"
              type="password"
              required
              value={loginData.password}
              onChange={(event) =>
                setLoginData((prev) => ({ ...prev, password: event.target.value }))
              }
              className="w-full p-2 mb-4 rounded border bg-black/20"
            />
            <button className={`button w-full ${buttonClass}`} disabled={loading}>
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
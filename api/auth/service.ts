import { hashPassword, verifyPassword } from "@/lib/hash";
import { loginSchema, registerSchema, type User } from "@/lib/models";
import { findUserByEmail, insertUser } from "@/lib/repositories";

export async function register(payload: unknown) {
  const data = registerSchema.parse(payload);
  const existing = await findUserByEmail(data.email);
  if (existing) {
    throw new Error("Usuário já existe");
  }

  const bundle = hashPassword(data.password);
  const user: User = {
    email: data.email,
    passwordHash: bundle.hash,
    salt: bundle.salt,
    createdAt: new Date().toISOString()
  };

  const stored = await insertUser(user);
  return { id: stored._id, email: stored.email };
}

export async function login(payload: unknown) {
  const data = loginSchema.parse(payload);
  const user = await findUserByEmail(data.email);
  if (!user || !verifyPassword(data.password, { hash: user.passwordHash, salt: user.salt })) {
    throw new Error("Credenciais inválidas");
  }

  return { id: user._id, email: user.email };
}

export async function logout() {
  return { success: true };
}

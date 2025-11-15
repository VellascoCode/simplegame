import { createHash, randomBytes } from "crypto";

export type PasswordBundle = {
  hash: string;
  salt: string;
};

export function hashPassword(password: string): PasswordBundle {
  const salt = randomBytes(16).toString("hex");
  const hash = applyHash(password, salt);
  return { hash, salt };
}

export function verifyPassword(password: string, bundle: PasswordBundle): boolean {
  return applyHash(password, bundle.salt) === bundle.hash;
}

function applyHash(password: string, salt: string) {
  return createHash("sha256").update(`${password}:${salt}`).digest("hex");
}

import CredentialsProvider from "next-auth/providers/credentials";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { findUserByEmail } from "@/lib/repositories";
import { verifyPassword } from "@/lib/hash";

type JwtCallbackParams = {
  token: JWT;
  user?: { id?: string } | null;
};

type SessionCallbackParams = {
  session: Session & { expires: string };
  token: JWT;
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await findUserByEmail(credentials.email);
        if (!user) return null;
        const isValid = verifyPassword(credentials.password, {
          hash: user.passwordHash,
          salt: user.salt
        });
        if (!isValid) return null;
        return { id: user._id ?? "", email: user.email };
      }
    })
  ],
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }: JwtCallbackParams) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: SessionCallbackParams) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/"
  },
  secret: process.env.NEXTAUTH_SECRET
};

import type { NextAuthOptions } from "next-auth";

import NextAuth from "next-auth/next";

import { authOptions } from "@/lib/authOptions";

type NextAuthRouteHandler = (request: Request) => Promise<Response>;

const handler = NextAuth(authOptions as NextAuthOptions) as unknown as NextAuthRouteHandler;

export { handler as GET, handler as POST };

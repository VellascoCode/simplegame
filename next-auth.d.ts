import "next-auth";
import "next-auth/jwt";

export { default } from "next-auth/next";
export { getServerSession } from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      email?: string | null;
      name?: string | null;
    };
  }

  interface User {
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

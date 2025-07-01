import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/data/users";
import type { NextAuthOptions, Session } from "next-auth";
import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { authOptions } from "../auth";

// Extend the default Session type to include our custom properties
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id?: string;
      role: string;
    }
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultSession {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);

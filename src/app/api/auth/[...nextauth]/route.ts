import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/data/users";
import type { NextAuthOptions, Session } from "next-auth";
import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

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
  interface JWT {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to admin page after successful login
      if (url === '/auth/login' && baseUrl === 'http://localhost:3000') {
        return '/admin';
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user && user.email) {
        token.id = user.id || '';
        token.email = user.email || '';
        token.name = user.name || '';
        token.role = user.email === 'admin@example.com' ? 'admin' : 'user';
      }
      return token;
    }
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find(u => u.email === credentials.email);
        if (!user || credentials.password !== user.password) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

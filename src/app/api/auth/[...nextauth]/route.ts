import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/data/users";
import type { NextAuthOptions, Session } from "next-auth";
import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { User } from "@/types/user";

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

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 3 * 60, // 3 minutes
    updateAge: 2 * 60, // 2 minutes
  },
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to admin page after successful login
      if (url === '/auth/login') {
        return '/admin';
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email as string;
        token.name = user.name as string;
        token.role = user.role as string;
      }
      return token as JWT;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = users.find(u => u.email === credentials.email);
        if (!user || credentials.password !== user.password) {
          throw new Error('Invalid credentials');
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || 'votre-secret-ici',
  debug: process.env.NODE_ENV === 'development'
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export default authOptions;

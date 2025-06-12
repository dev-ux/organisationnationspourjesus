import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/data/users";
import bcrypt from 'bcryptjs';
import type { NextAuthOptions } from "next-auth";
import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Attempting to authorize with credentials:', credentials);
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        // Recherche de l'utilisateur dans la base de données
        const user = users.find(u => u.email === credentials.email);
        console.log('Found user:', user);
        
        if (!user) {
          console.log('User not found');
          return null;
        }

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        console.log('Password valid:', isPasswordValid);
        
        if (!isPasswordValid) {
          console.log('Invalid password');
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  session: {
    strategy: 'jwt' as const
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: DefaultSession; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

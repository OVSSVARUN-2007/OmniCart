import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import { getAuthSecret } from "@/lib/env";
import { prisma } from "@/lib/postgres";

const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
const adapterEnabled = Boolean(process.env.DATABASE_URL);

export const authOptions: NextAuthConfig = {
  trustHost: true,
  secret: getAuthSecret(),
  session: {
    strategy: "jwt"
  },
  ...(adapterEnabled ? { adapter: PrismaAdapter(prisma) } : {}),
  pages: {
    signIn: "/auth/signin"
  },
  providers: [
    ...(googleEnabled
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          })
        ]
      : [])
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!account) {
        return false;
      }

      if (account.provider === "google") {
        return Boolean(profile?.email);
      }

      return false;
    },
    async jwt({ token, account, user }) {
      if (account?.provider) {
        token.provider = account.provider;
      }

      if (user?.email) {
        token.email = user.email;
      }

      if (user?.name) {
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (typeof token.email === "string") {
          session.user.email = token.email;
        }

        if (typeof token.name === "string") {
          session.user.name = token.name;
        }
      }

      return session;
    }
  }
};

export const enabledProviders = {
  google: googleEnabled
};

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";

import { getAuthSecret } from "@/lib/env";
import { findLocalUserByEmail, verifyLocalPassword } from "@/lib/local-store";

const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const authOptions: NextAuthConfig = {
  trustHost: true,
  secret: getAuthSecret(),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin"
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const user = await findLocalUserByEmail(parsed.data.email);

        if (!user) {
          return null;
        }

        const isValidPassword = await verifyLocalPassword(parsed.data.password, user.passwordHash);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email
        };
      }
    }),
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

      if (account.provider === "credentials") {
        return true;
      }

      if (account.provider === "google") {
        return Boolean(profile?.email);
      }

      return false;
    },
    async jwt({ token, account, user }) {
      if (user?.id) {
        token.sub = user.id;
      }

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
        if (typeof token.sub === "string") {
          session.user.id = token.sub;
        }

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
  credentials: true,
  google: googleEnabled
};

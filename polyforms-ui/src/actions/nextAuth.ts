import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import Github from "next-auth/providers/github";
import { authenticateGithub } from "./auth";

export const authOptions: AuthOptions = {
  secret: "fb03e0db8a8097047b6dccba427337204ab78fdf",
  providers: [
    Github({
      clientId: "060ffe6badc7fffdfbb2",
      clientSecret: "fb03e0db8a8097047b6dccba427337204ab78fdf",
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.access_token == undefined) {
        return false;
      }
      const res = await authenticateGithub(account?.access_token);
      if (res == null) {
        return false;
      }
      account.auth_token = res.data;
      return true;
    },
    jwt({ account, token }) {
      if (account && account.auth_token) {
        token.auth_token = account.auth_token;
      }
      return token;
    },
    session({ session, token }) {
      session.auth_token = token.auth_token;
      return session;
    },
  },
};

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions);
}

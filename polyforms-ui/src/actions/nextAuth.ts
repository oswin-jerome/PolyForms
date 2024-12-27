import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import Github from "next-auth/providers/github";
import { authenticateGithub } from "./auth";

export const authOptions: AuthOptions = {
  secret: process.env.GITHUB_CLIENT_SECRET,
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
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

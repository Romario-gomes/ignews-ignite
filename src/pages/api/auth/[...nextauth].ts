import NextAuth from "next-auth";
import { query as q } from 'faunadb';
import GithubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/'
  },
  secret: process.env.NEXTAUTH_SECRET
})
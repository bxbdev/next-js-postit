import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// Already made a client in /prisma/client.js
import prisma from '../../../prisma/client'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // custom auth secret for next-auth provider
  // secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}

export default NextAuth(authOptions)
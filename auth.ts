import NextAuth from "next-auth"
import { getUserById } from "./lib/user"
import {PrismaAdapter} from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "./lib/prisma"
import { Role } from "@prisma/client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session:{
        strategy:"jwt"
   },
  callbacks:{
    async jwt({ token }) {
      if (token.sub) {
        const existingUser= await getUserById(token.sub)
        token.role=existingUser?.role
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.name = token.name as string;
        session.user.role=token.role as Role
      }

      return session;
    }, 
},
...authConfig
})
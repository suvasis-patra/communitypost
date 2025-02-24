import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { UserLoginSchema } from "./lib/validation"
import { checkPassword } from "./lib/index"
import { prisma } from "./lib/prisma"


 
export default { providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields= UserLoginSchema.safeParse(credentials)
        if(!validatedFields.success){
            return null
        }
        const {email,password}=validatedFields.data
        const user= await prisma.user.findFirst({
            where:{email}
        })
        if(!user){
            return null
        }
        const isPasswordCorrect= await checkPassword(user.password,password)
        if(!isPasswordCorrect){
            return null
        }
        return user
      },
    }),
  ], } satisfies NextAuthConfig
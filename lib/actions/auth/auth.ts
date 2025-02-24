'use server'
import { z } from "zod"
import {PrismaClient} from "@prisma/client"
import bcrypt from "bcryptjs"

import { UserLoginSchema, UserRegistrationSchema } from "@/lib/validation"
import { signIn, signOut } from "@/auth"

const prisma=new PrismaClient()

export const register=async(userData:z.infer<typeof UserRegistrationSchema>)=>{
    const validatedFields= UserRegistrationSchema.safeParse(userData)
    if(!validatedFields.success){
        return {success:false,message:"Invalid data!"}
    }
    const {email,password,username}=validatedFields.data

    const existingUser= await prisma.user.findFirst({
        where:{email}
    })
    if (existingUser){
        return {success:false,message:"Email taken!"}
    }
    const hahsedPassword=await bcrypt.hash(password,10)
    try {
        await prisma.user.create({
            data:{
                email,
                username,
                password:hahsedPassword,
            }
        })
        return {success:true,message:"registered!!"}
    } catch (error) {
        console.log(error)
        return {success:false,message:"Failed to register!"}
    }
}

export const login=async(userData:z.infer<typeof UserLoginSchema>)=>{
    const validatedFields= UserLoginSchema.safeParse(userData)
    if(!validatedFields.success){
        return {success:false,message:"Invalid data!"}
    }
    const {email,password}=validatedFields.data
    try {
        const result = await signIn("credentials",{email,password,redirect:false})
        if(result?.error){
            return {success:false,error:result?.error}
        }
        return {success:true}
    } catch (error) {
        console.log("ERROR",error)
        return {success:false,error:"signin error"}
    }

}

export const logout=async()=>{
    await signOut()
}
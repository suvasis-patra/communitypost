import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export const getUserById=async(userId:string)=>{
    try {
        const user = await prisma.user.findUnique({
            where:{id:userId}
        })
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getUserByEmail=async(email:string)=>{
    try {
        const user = await prisma.user.findUnique({
            where:{email}
        })
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}
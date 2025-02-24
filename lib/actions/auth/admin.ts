'use server'

import { auth } from "@/auth"
import { Role,PrismaClient, Status } from "@prisma/client"

const prisma=new PrismaClient()

export const approvePost=async(postId:string)=>{
    const session= await auth()
    if(session?.user.role!==Role.ADMIN){
        return {success:false,message:"Unauthorized!"}
    }
    await prisma.post.update({
        where:{id:postId},
        data:{status:Status.APPROVED}
    })
    return {success:true,message:"Post Approved!"}
}
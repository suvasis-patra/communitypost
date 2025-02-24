'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Role,Status } from "@prisma/client"


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
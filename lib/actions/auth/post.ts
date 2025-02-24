'use server'
import { z } from "zod";
import {PrismaClient, Role, Status} from "@prisma/client"

import { PostSchema } from "@/lib/validation";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const prisma=new PrismaClient()

export const createPost=async(postData:z.infer<typeof PostSchema>)=>{
    const session = await auth()
    if(!session?.user||!session.user.id){
        redirect("/login")
    }
    console.log(postData)
    const validatedFields= PostSchema.safeParse(postData)
        if(!validatedFields.success){
            return {success:false,message:"Invalid data!"}
        }
        const {title,content}=validatedFields.data
        console.log(title,content)
        try {
            await prisma.post.create({
                data:{
                    title,
                    content,
                    authorId:session.user.id
                }
            })
            return {success:true,message:"post created!!"}
        } catch (error) {
            console.log(error)
            return {success:false,message:"Failed to register!"}
        }
}


export const getAllPosts = async () => {
    const session= await auth()
    console.log(session?.user.role)
    if(session?.user.role!==Role.ADMIN){
        return {success:false,message:"Unauthorized!"}
    }
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            include:{
                author:{
                    select:{
                        username:true
                    }
                }
            }
        });
        if (posts.length === 0) {
            return { success: false, message: "No posts found!", data: [] };
        }

        return { success: true, data: posts };
    } catch (error) {
        console.error("Error fetching posts:", error);
        return { success: false, message: "Failed to fetch posts!" };
    }
};

export const getApprovedPosts=async()=>{
    try {
        const posts = await prisma.post.findMany({
            where:{
                status:Status.APPROVED
            },
            include:{
                author:{
                    select:{
                        username:true
                    }
                }
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        if (posts.length === 0) {
            return { success: false, message: "No posts found!", data: [] };
        }

        return { success: true, data: posts };
    } catch (error) {
        console.error("Error fetching posts:", error);
        return { success: false, message: "Failed to fetch posts!" }; 
    }
}

export const getPostByUserId=async()=>{
    const session=await auth()
    const posts=await prisma.post.findMany({
        where:{
            authorId:session?.user.id
        }
    })
    return posts
}

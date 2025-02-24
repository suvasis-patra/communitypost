'use client'
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PostSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import { createPost } from '@/lib/actions/auth/post'
import { Textarea } from './ui/textarea'

const CreatePost = () => {
    const router=useRouter()
      const [isPending,setIsPending]=useState(false)
      const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
          title: "",
          content: "",
        },
      });
    
      async function onSubmit(values: z.infer<typeof PostSchema>) {
        setIsPending(true)
        const result=await createPost(values)
        console.log(result)
        if(result.success){
          router.push("/")
        }
        setIsPending(false)
      }
  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-12">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="input-label">title</FormLabel>
              <FormControl>
                <Input placeholder="Post title..." className="input-field" type="text" {...field} disabled={isPending}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="input-label">content</FormLabel>
              <FormControl>
                <Textarea placeholder="Post description..." className="input-field" {...field} disabled={isPending}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center gap-4 justify-end'>
            <Button type="submit" className="uppercase bg-[#2658ff] rounded hover:bg-[#4c69d4] shadow" disabled={isPending}>
                create post
            </Button>
            <Button type='button' className='uppercase bg-[#e8edff] text-black transition-all duration-150 rounded hover:bg-[#4c69d4] shadow'>
                cancle
            </Button>
        </div>
      </form>
    </Form>
    
  )
}

export default CreatePost
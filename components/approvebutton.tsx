'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { approvePost } from '@/lib/actions/auth/admin'
import { toast } from 'sonner'

const ApproveButton = ({postId}:{postId:string}) => {
    const [isPending,setIsPending]=useState(false)
    const approvePostHandler=async()=>{
        setIsPending(true)
        const result=await approvePost(postId)
        if(result.success){
            toast("Post Approved!")
        }
        toast("Failed to approve!")
        setIsPending(false)
    }
  return (
    <Button onClick={approvePostHandler} disabled={isPending} className="uppercase w-full bg-[#2658ff] rounded hover:bg-[#4c69d4] shadow">Approve</Button>
  )
}

export default ApproveButton
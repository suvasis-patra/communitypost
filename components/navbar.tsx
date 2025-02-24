import React from 'react'
import { MessageCirclePlus, Rows2} from "lucide-react"
import Link from 'next/link'
import { auth } from '@/auth'
import LogoutButton from './logoutbutton'
import { Role } from '@prisma/client'
const Navbar = async() => {
  const session=await auth()
  const isAdmin=session?.user.role===Role.ADMIN
  return (
    <nav className='p-2 border-b-[1px] flex justify-between gap-4 items-center'>
        <Link href={"/"}>
            <h1 className='text-[#2658ff] text-xl font-bold uppercase cursor-pointer'>post thought</h1>
        </Link>
        <div>
            {
              session?.user 
              ?<div className='flex items-center gap-4'>
                {isAdmin && <Link href={"/dashboard"} className='bg-[#e8edff] text-black transition-all duration-150 rounded hover:bg-[#4c69d4] shadow flex flex-row justify-center items-center gap-2 p-2 uppercase font-semibold'>
                        <span><Rows2 size={16}/></span>
                        <span>Go to Dashboard</span>
                </Link>}
                 <Link href={"/create-post"} className='bg-[#2658ff] rounded hover:bg-[#4c69d4] shadow transition-all duration-150 flex flex-row justify-center items-center gap-2 p-2 uppercase font-semibold'>
                    <span><MessageCirclePlus size={16}/></span>
                    <span>Create Post</span>
                </Link>
                <LogoutButton/>
              </div>
              :<Link href={"/login"} className='bg-[#2658ff] rounded hover:bg-[#4c69d4] shadow transition-all duration-150 flex flex-row justify-center items-center gap-2 py-2 px-3 uppercase font-semibold'>login</Link>}
        </div>
    </nav>
  )
}

export default Navbar
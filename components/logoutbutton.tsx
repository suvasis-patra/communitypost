'use client'
import { Button } from './ui/button'
import { logout } from '@/lib/actions/auth/auth'
import { LogOut } from 'lucide-react'

const LogoutButton = () => {
    const logoutHandler=async()=>{
        await logout()
    }
  return (
    <Button onClick={logoutHandler} size="icon" className='rounded-full'>
        <LogOut/>
    </Button>
  )
}

export default LogoutButton
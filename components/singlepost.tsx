import { auth } from '@/auth'
import { TPost } from '@/lib/types'
import { Role } from '@prisma/client'
import ApproveButton from './approvebutton'

const SinglePost = async({post}:{post:TPost}) => {
  const session=await auth()
  const isAdmin= session?.user.role===Role.ADMIN
  return (
    <article className='flex flex-col max-w-[300px] p-4 rounded-md bg-[#e8edff] shadow gap-4'>
        <h3 className='font-semibold text-[#2658ff] text-lg'>{post.title}</h3>
        <p>{post.content}</p>
        <div className='flex w-full justify-between items-center'>
            <span className='font-bold text-[#2658ff]'>{post.author.username}</span>
            <div className='flex items-center gap-2'>
               <span className='font-semibold'>{post.createdAt.toLocaleDateString()}</span>
               {isAdmin && <ApproveButton postId={post.id}/>}
            </div>
        </div>
    </article>
  )
}

export default SinglePost
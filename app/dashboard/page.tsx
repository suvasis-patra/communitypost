import { auth } from '@/auth'
import SinglePost from '@/components/singlepost'
import { getAllPosts } from '@/lib/actions/auth/post'
import { Role } from '@prisma/client'

const AdminDashboard = async() => {
  const session= await auth()
  if(session?.user.role!==Role.ADMIN){
    return <div>
      <h1>Access Denied!</h1>
    </div>
  }
  const result=await getAllPosts()
  console.log(result.data)
  return (
    <section className='py-6 md:py-12 grid md:grid-cols-2 lg:grid-cols-3"'>
      {result.data?.map((post)=><div key={post.id}>
        <SinglePost post={post}/>
      </div>)}
    </section>
  )
}

export default AdminDashboard
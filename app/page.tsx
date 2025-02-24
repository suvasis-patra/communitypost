import SinglePost from "@/components/singlepost";
import { getApprovedPosts } from "@/lib/actions/auth/post";

export default async function Home() {
  const result= await getApprovedPosts()
  if(!result.data){
    return <div className="py-6 md:py-12">
               <h3 className="text-2xl font-semibold text-[#2658ff]">Failed to fetch posts, there is some error!</h3>
           </div>
  }
  if (result.data && result.data.length===0){
    return <div className="py-6 md:py-12">
      <h3 className="text-2xl font-semibold text-[#2658ff]">There is no post to fetch!</h3>
    </div>
  }
  return (
    <section className="py-6 md:py-12 grid md:grid-cols-2 lg:grid-cols-3">
      {result.data.map((post)=><div key={post.id}>
        <SinglePost post={post}/>
      </div>)}
    </section>
  );
}

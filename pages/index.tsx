import type { NextPage } from 'next'
import moment from 'moment'
import { useUser } from '@auth0/nextjs-auth0'
import { Post, LoadingScreen } from '../components/'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const Home: NextPage = () => {


  const { user, isLoading } = useUser()
  const router = useRouter()
  const { pathname, query } = router
  const [posts, setPosts] = useState([])
  const grid = useRef(null)

  
  async function getPosts() {
    // console.log('starting...');
    
    const res = await fetch('/api/post')
    
    const posts = await res.json()

    posts.data.map((post: any, index: any) => {
      // console.log(`post ${index}: ${moment(post.createdAt).format("DD MM YYYY hh:mm:ss:SSSS")}`);
      console.log(`post ${index}: ${Date.parse(post.createdAt)}`);
      
    })

    // console.log(posts.data);
    
//{posts.map((post, index) => <Post post={post} key={index} />}
    
  // posts.data.sort((b: any, a: any) => moment(a).diff(a) + moment(b).diff(b))
    posts.data.sort((a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    
    setPosts(posts.data)
  }
    
  useEffect(() => {

    


    getPosts()
  }, [posts])

  useEffect(() => {
    if (query.updateCreatedComments === 'true') {
            console.log('posts updated');
            getPosts()
            router.push('/')
        }
  }, [pathname, query])

  return (
    <>
      <LoadingScreen isLoading={true} />
      <div className="min-h-screen">
        <div ref={grid} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 posts-container absolute z-10 overflow-y-auto my-14 h-full  dark:text-white'>
          {/*grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 */}
          {!isLoading && (
            <>
              {posts.map((post, index) => <Post post={post} key={index} />)}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Home


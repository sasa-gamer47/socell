import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'
import { Post, LoadingScreen } from '../components/'
import { useState, useEffect, useRef } from 'react'

const Home: NextPage = () => {


    const { user, isLoading } = useUser()

  const [posts, setPosts] = useState([])
  const grid = useRef(null)
    
  useEffect(() => {

    async function getPosts() {
      // console.log('starting...');
      
      const res = await fetch('/api/post')
      
      const posts = await res.json()

      // console.log(posts.data);
      
//{posts.map((post, index) => <Post post={post} key={index} />}
      setPosts(posts.data)
    }
    


  getPosts()
  }, [posts])

  

  return (
    <>
      <LoadingScreen isLoading={true} />
      <div className="min-h-screen">
        <div ref={grid} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 posts-container absolute z-10 overflow-y-scroll my-14 h-full  dark:text-white'>
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


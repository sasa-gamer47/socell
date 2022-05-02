import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { Navbar, DownNavbar, Post } from '../components/'
import { useState, useEffect } from 'react'

const Home: NextPage = () => {


    const { user, isLoading } = useUser()

    const [posts, setPosts] = useState([])
    
  useEffect(() => {

    async function getPosts() {
      console.log('starting...');
      
      const res = await fetch('/api/post')
      
      const posts = await res.json()

      // console.log(posts.data);
      
//{posts.map((post, index) => <Post post={post} key={index} />}
      setPosts(posts.data)
    }
    


  getPosts()
  }, [posts])

    
  
  

  return (
    <div className="min-h-screen">
      <Head>
        <title>Socell | Home</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar />
      <DownNavbar />
      <div className='container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 absolute z-10 overflow-y-scroll my-14 h-full  dark:text-white'>
        {!isLoading && (
          <>
            {posts.map((post, index) => <Post post={post} key={index} />)}
          </>
        )}
      </div>
    </div>
  )
}

export default Home


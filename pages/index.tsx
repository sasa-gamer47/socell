import type { NextPage } from 'next'
import moment from 'moment'
import { useUser } from '@auth0/nextjs-auth0'
import { Post, LoadingScreen } from '../components/'
import { useState, useEffect, useRef } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useRouter } from 'next/router'

const Home: NextPage = () => {


  const { user, isLoading } = useUser()
  const router = useRouter()
  const { pathname, query } = router
  const [posts, setPosts] = useState([])
  const grid = useRef(null)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const searchBar = useRef(null)

  
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
    if (query.showSearchBar === 'true') {
            setShowSearchBar(true)
    }
  }, [pathname, query])

  return (
    <>
      <LoadingScreen isLoading={true} />
      <div className="min-h-screen">
        {showSearchBar && (
          <>
            <div className='fixed z-50 w-full h-full bg-black opacity-60'></div>
            <div className='absolute z-50 flex items-center top-0 left-0 bg-gray-100 text-xl dark:text-white font-semibold dark:bg-zinc-800 w-full'>
              <input ref={searchBar} type="text" placeholder='Cerca un post...' className='p-2 bg-transparent outline-none w-full' />
              <div onClick={() => {
                if (searchBar && searchBar.current) {
                  if (searchBar.current?.value.charAt(0) === '#') {
                    setShowSearchBar(false)
                    router.push({ pathname: `/search/tag/${searchBar.current?.value.substring(1)}` })
                  } else {
                    setShowSearchBar(false)
                    router.push({ pathname: '/search', query: { q: searchBar.current?.value } })
                  }
                }
              }} className='p-2 text-2xl flex items-center justify-center font-extrabold w-10 cursor-pointer'>
                <RiSearchLine />
              </div>
            </div>
          </>

        )}
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


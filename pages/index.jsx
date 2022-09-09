import { NextPage } from 'next'
import moment from 'moment'
import { useUser } from '@auth0/nextjs-auth0'
import { Post, LoadingScreen } from '../components'
import { useState, useEffect, useRef } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useRouter } from 'next/router'

const Home = () => {


  const { user, isLoading } = useUser()
  const router = useRouter()
  const { pathname, query } = router
  const [posts, setPosts] = useState([])
  const grid = useRef(null)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const searchBar = useRef(null)
  const [suggestions, setSuggestions] = useState([])

  
  async function getPosts() {
    // console.log('starting...');
    
    const res = await fetch('/api/post')
    
    const posts = await res.json()

    posts.data.map((post, index) => {
      // console.log(`post ${index}: ${moment(post.createdAt).format("DD MM YYYY hh:mm:ss:SSSS")}`);
      console.log(`post ${index}: ${Date.parse(post.createdAt)}`);
      
    })

    // console.log(posts.data);
    
//{posts.map((post, index) => <Post post={post} key={index} />}
    
  // posts.data.sort((b: any, a: any) => moment(a).diff(a) + moment(b).diff(b))
    posts.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    
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

  async function getSuggestions(query) {
    if (query.trim() !== '') {
      console.log('getting suggestions...')
      const res = await fetch(`/api/search/suggestions/${query}`)
      const data = await res.json()

      // setSuggestions(data.data)
      return data.data
    }
  }

  return (
    <>
      <LoadingScreen
        isLoading={query.showSearchBar === 'true' ? false : true}
      />
      <div className="min-h-screen">
        {showSearchBar && (
          <>
            <div className="fixed z-50 h-full w-full bg-black opacity-60" onClick={() => setShowSearchBar(false)}></div>
            <div className="absolute h-12 top-0 left-0 z-50 flex w-full items-center bg-gray-100 text-xl font-semibold dark:bg-zinc-800 dark:text-white">
              <input
                ref={searchBar}
                type="text"
                placeholder="Cerca un post..."
                className="w-full bg-transparent p-2 outline-none"
                onChange={async (e) => { 
                  if (e.target.value.trim() !== '') {
                    const data = await getSuggestions(e.target.value)

                    // console.log('searched suggestions: ', data);
                    // alert('searched suggestions: ' + JSON.stringify(data));

                    const MAX_SUGGESTIONS = 9
                    const SUGGESTION_LENGTH = 15
                
                    if (data.length > 0) {
                        let suggestions = []
                        if (data.length > MAX_SUGGESTIONS) {
                            for (let i = 0; i < MAX_SUGGESTIONS; i++) {
                                const index = data[i].content.indexOf(e.target.value)
                                if (suggestions.indexOf(data[i].content.substring(index, index + SUGGESTION_LENGTH)) === -1) {
                                    suggestions.push(data[i].content.substring(index, index + SUGGESTION_LENGTH))
                                    // console.log('suggestion: ', data[i])
                                }
                            }
                        } else {
                            for (let i = 0; i < data.length; i++) {
                                const index = data[i].content.indexOf(e.target.value)
                                if (suggestions.indexOf(data[i].content.substring(index, index + SUGGESTION_LENGTH)) === -1) {
                                    suggestions.push(data[i].content.substring(index, index + SUGGESTION_LENGTH))
                                    // console.log('suggestion: ', data[i])
                                }
                            }
                        }

                        setSuggestions(suggestions)
                        // setSuggestions(['first', 'second', 'third'])
                        // alert('current suggestions ' + suggestions)
                    } else {
                        // console.log('no suggestions');
                    }
                }
                }}
              />
              <div className="absolute top-12 flex w-full flex-col items-center bg-gray-100 text-black dark:bg-zinc-800 dark:text-white">
                {suggestions.map((suggestion, index) => {
                    // {alert('suggestion: ' + suggestion)}
                    return <div onClick={() => {
                        router.push({ pathname: '/search', query: { q: suggestion } })
                        setSuggestions([])
                    }} className='border-b-2 border-gray-200 black:border-zinc-700 w-full transition duration-300 hover:bg-gray-300 dark:hover:bg-zinc-700 cursor-pointer flex items-center justify-center py-1'>{suggestion}</div>
                })}
              </div>
              <div
                onClick={() => {
                  if (searchBar && searchBar.current) {
                    if (searchBar.current.value.charAt(0) === '#') {
                      setShowSearchBar(false)
                      router.push({
                        pathname: `/search/tag/${searchBar.current.value.substring(
                          1
                        )}`,
                      })
                    } else {
                      setShowSearchBar(false)
                      router.push({
                        pathname: '/search',
                        query: { q: searchBar.current.value.toLowerCase() },
                      })
                    }
                  }
                }}
                className="flex w-10 cursor-pointer items-center justify-center p-2 text-2xl font-extrabold"
              >
                <RiSearchLine />
              </div>
            </div>
          </>
        )}
        <div
          ref={grid}
          className="posts-container absolute z-10 my-14 grid h-full grid-cols-1 overflow-y-auto dark:text-white sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4"
        >
          {/*grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 */}
          {!isLoading && (
            <>
              {posts.map((post, index) => (
                <Post post={post} key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Home


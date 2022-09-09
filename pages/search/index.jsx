import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Post } from '../../components'

// add the people search

const search = ({ q }) => {

    const [posts, setPosts] = useState([])
    const router = useRouter()
    const { pathname, query } = router

    async function getSearchedPosts() {
        const res = await fetch(`/api/search/${q}`)
        const data = await res.json()

        data.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        setPosts(data.data)
    }

    useEffect(() => {
        console.log('search query: ', q);
        getSearchedPosts()
    }, [query])

    useEffect(() => {
        console.log(posts);
    }, [posts])

    return (
        <div className="min-h-screen">
            <div
            // ref={grid}
            className="posts-container absolute z-10 my-14 grid h-full grid-cols-1 overflow-y-auto dark:text-white sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4"
            >
            {/*grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 */}
                <>
                    {posts.length > 0 ? (
                        <>
                            {posts.map((post, index) => (
                                <Post post={post} key={index} />
                            ))}
                        </>
                    ) : 
                        <div className='left-1/2 top-1/4 sm:top-1/2 translate-y-1/2 text-3xl text-gray-500 font-semibold -translate-x-1/2 fixed '>Non abbiamo trovato nessun post :-(</div>
                    }
                </>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            q: context.query.q,
        }
    }
}

export default search
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Post } from '../../../components'
import { randomNumberBetween } from '../../../utils'
import Link from 'next/link'

const search = ({ tag }) => {

    const [posts, setPosts] = useState([])
    const router = useRouter()
    const { pathname, query } = router
    const [tags, setTags] = useState([])
    const [randomTags, setRandomTags] = useState([])

    async function getTags() {
        const res = await fetch('/api/search/tag/getTags')
        const data = await res.json()

        setTags(data.data)
    }

    async function getRandomTags(amount) {
        const randomTags = []

        if (tags.length > 0) {
            for (let i = 0; i < amount; i++) {
                const random = randomNumberBetween(0, tags.length - 1)
                console.log(random);
                // console.log('tags', tags);
                randomTags.push(tags[random])
            }
        }

        setRandomTags(randomTags)
    }

    async function getSearchedPosts() {
        const res = await fetch(`/api/search/tag/${tag}`)
        const data = await res.json()

        data.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        setPosts(data.data)

        if (data.data.length === 0) {
            getTags()
            
        }
    }

    useEffect(() => {
        console.log('tag: ', tag);
        getSearchedPosts()
        
    }, [query])
    
    useEffect(() => {
        console.log(posts);
    }, [posts])

    useEffect(() => { 
        getRandomTags(randomNumberBetween(4, 9))
    }, [tags])

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
                ) : (
                <>
                    <div className="fixed left-1/2 top-1/2 translate-y-1/2 -translate-x-1/2 text-3xl font-semibold text-gray-500">
                    Non abbiamo trovato nessun post con questo tag :-(
                    </div>
                    <>
                    <div className="fixed gap-y-2 left-1/2 top-3/4 grid grid-cols-7 w-10/12 translate-y-1/2 -translate-x-1/2 a items-center justify-center">
                        {randomTags.map((tag, index) => (
                        <>
                            <Link href={`/search/tag/${tag}`}>
                            <div className="w-fit cursor-pointer rounded-lg bg-zinc-300 px-1 py-1 transition duration-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500 sm:px-2">
                                #{tag}
                            </div>
                            </Link>
                        </>
                        ))}
                    </div>
                    </>
                </>
                )}
            </>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    return {
        props: {
            tag: context.query.tag,
        }
    }
}

export default search
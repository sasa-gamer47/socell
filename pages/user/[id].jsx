import React from 'react'
import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import { Post, Comment } from '../../components'
import { useRouter } from 'next/router'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'


const user = ({ id, u }) => {

    // const { user, isLoading } = useUser()
    const router = useRouter()
    const { pathname, query } = router
    const [user, setUser] = useState(u.data)
    const [totLikes, setTotLikes] = useState(0)
    const [totFavorites, setTotFavorites] = useState(0)
    const [userPosts, setUserPosts] = useState([])
    const [userComments, setUserComments] = useState([])
    const sections = ['Post utente', 'Preferiti', 'Raccolte', 'Commenti']
    const [currentSection, setCurrentSection] = useState(sections[2])
    const [showDirectory, setShowDirectory] = useState(false)
    const [currentDirectory, setCurrentDirectory] = useState(null)
    // console.log('id: ', id)
    console.log('user: ', user);

    async function getUserPosts(id) {
        const res = await fetch(`/api/post/user/${id}`)
        const userPosts = await res.json()
        // console.log('posts: ', userPosts);
        userPosts.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        setUserPosts(userPosts.data)

        return userPosts.data
    }

    async function getUserComments(id) {
        const res = await fetch(`/api/comment/user/${id}`)
        const userComments = await res.json()

        userComments.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        setUserComments(userComments.data)

        return userComments.data
    }

    useEffect(() => {
        console.log('query: ', query.section)
        query.section ? setCurrentSection(Number(query.section)) : ''
    }, [pathname, query])

    useEffect(() => {
        router.push(pathname)
    }, [user.directories])

    useEffect(() => { 
        getUserPosts(id)
        getUserComments(id)
    }, [id])

    useEffect(() => {
        setTotLikes(userPosts.reduce((acc, curr) => acc + curr.likes, 0))
        setTotFavorites(userPosts.reduce((acc, curr) => acc + curr.favorites, 0))
    } , [userPosts])
    

    return (
        <div className='absolute bottom-14 w-full sm:bottom-0 top-14 dark:text-white'>
            <div className='relative w-full h-full'>
                <div className='absolute h-2/6 left-1/2 -translate-x-1/2 top-5 rounded-lg shadow-xl px-3 py-1 bg-gray-200 dark:bg-zinc-700 w-8/12'>
                    <div className='absolute left-2 flex justify-center items-center top-0 w-1/4 h-full'>
                        <div className='relative h-5/6 w-full flex justify-center items-center border-r-2 border-gray-300 dark:border-zinc-600'>
                            <div className='w-40 h-40 rounded-full border-4 border-gray-300 dark:border-zinc-600 drop-shadow-lg'>
                                {user.picture &&
                                    <Image src={user.picture} alt={user.name} layout='fill' className='rounded-full' fill='responsive' />
                                } 
                            </div>
                            {/* <img src={user.picture} className='w-40 h-40 rounded-full border-4 border-gray-300 dark:border-zinc-600 drop-shadow-lg' /> */}
                        </div>
                    </div>                
                    <div className='absolute flex justify-center items-center left-1/4 top-0 w-1/4 h-full'>
                        <div className='relative h-5/6 w-full flex justify-center items-center border-r-2 border-gray-300 dark:border-zinc-600'>
                            {user.name}
                            {/* will display real name, surname, and bio... */}
                        </div>
                    </div>
                    <div className='absolute flex justify-center items-center left-2/4 top-0 w-1/4 h-full'>
                        <div className='relative gap-y-1 h-5/6 w-full flex flex-col justify-center items-center border-r-2 border-gray-300 dark:border-zinc-600'>
                            <p>Mi piace totali: {totLikes}</p>
                            <p>Preferiti totali: {totFavorites}</p>
                            {/* will display real name, surname, and bio... */}
                        </div>
                    </div>
                </div>
                <div className='absolute w-full -mt-16 top-2/4 px-4 bottom-4'>
                    <div className='flex justify-around items-center w-screen -translate-x-4 h-14 bg-gray-300 dark:bg-zinc-600'>
                        {sections.map((section, index) => {
                            return <div onClick={() => setCurrentSection(sections[index])} className={`${currentSection === sections[index] ? 'bg-gray-400 dark:bg-zinc-500' : ''} w-full hover:bg-gray-400 dark:hover:bg-zinc-500 transition duration-300 cursor-pointer flex justify-center items-center text-xl font-semibold h-full`}>{section}</div>
                        })}
                        {/* <div className='w-full hover:bg-gray-400 dark:hover:bg-zinc-500 transition duration-300 cursor-pointer flex justify-center items-center text-xl font-semibold h-full'>Preferiti</div> // will display only if the user allows */}
                    </div>
                    {currentSection === sections[0] && (
                        <div className='grid grid-cols-5 overflow-y-auto overflow-x-hidden'>
                            {userPosts.map((post, index) => {
                                // { console.log('posts loading...') }
                                return <Post key={index} post={post} />
                            })}
                        </div>
                    )}
                    {currentSection === sections[2] && (
                        <div>
                            <div className='absolute grid grid-cols-4 overflow-y-auto overflow-x-hidden top-20 bottom-0 w-full -translate-x-4 px-4'>
                                {user.directories && user.directories.map((directory, index) => {
                                    if (typeof directory === 'object') {
                                        return (
                                            <div onClick={() => {
                                                setCurrentDirectory(directory)
                                                setShowDirectory(true)
                                            }} className='hover:cursor-pointer transition duration-300 hover:scale-110 drop-shadow-lg rounded-lg w-9/12 h-4/6 bg-gray-200 dark:bg-zinc-700 overflow-hidden'>
                                                <div className='w-10 h-10 flex items-center justify-center absolute text-4xl top-3 right-3 rounded-full border-2 transition duration-300 hover:scale-110 border-yellow-500'>
                                                    {directory.isFavorite ? <AiFillStar className='text-yellow-300' /> : <AiOutlineStar className='text-yellow-300' />}
                                                </div>
                                                <img src={directory.images ? directory.images[1]?.img : ''} alt="" className='w-full h-full' />
                                                <div className='absolute bottom-0 h-2/6 w-full bg-gray-300 dark:bg-zinc-600 flex justify-center items-center font-semibold text-xl drop-shadow-t-lg'>{directory.name}</div>
                                            </div>
                                        )
                                    }  
                                })}
                            </div>
                            {showDirectory && (
                                <div className='absolute grid grid-cols-4 overflow-y-auto overflow-x-hidden top-20 bottom-0 w-full -translate-x-4 px-4 gap-x-4 gap-y-4'>
                                    {currentDirectory.images && currentDirectory.images.map((image, index) => (
                                        <>
                                            {
                                                typeof image === 'object' && (
                                                    <div className='w-full h-full drop-shadow-lg transition duration-300 hover:scale-110'>
                                                        <img src={image.img} className='w-full h-full' />
                                                    </div>
                                            )}
                                        </>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    {currentSection === sections[3] && (
                        <div className='grid grid-cols-5 overflow-y-auto overflow-x-hidden'>
                            {userComments.map((comment, index) => {
                                return <Comment key={index} comment={comment} currentUser={user} />
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
        
    const res = await fetch(`http://localhost:3000/api/user/${context.params.id}`)
    const user = await res.json()

    return {
        props: {
            id: context.params.id,
            u: user,
        },
    }
}

export default user
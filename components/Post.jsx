import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { AiOutlineLike, AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { Menu } from '@headlessui/react'
import testImg from '../images/testImg.jpg'
import testImg2 from '../images/testImg2.jpg'
import { getUser, getUserImgColor, getUserById } from '../utils'
import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'

const Post = ({ post }) => {

    const { user, isLoading } = useUser()
    const [postUser, setPostUser] = useState(null)
    const [mongoDBUser, setMongoDBUser] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [userBgColor, setUserBgColor] = useState(null)
    const [usernameFirstChar, setUsernameFirstChar] = useState(null)
    const [usernameSecondChar, setUsernameSecondChar] = useState(null)

    // console.log(post);
    

    useEffect(() => { 
        async function getUser() {
            const response = await fetch(`/api/user/${post.user}`)
            const user = await response.json()
            // console.log(user.data);
            setPostUser(user.data)

        }
        
        // getUserById(post.user, setPostUser)
        getUser()
    }, [])
    
    

    if (user && !mongoDBUser) {
        getUser(user, setMongoDBUser)
    }

        // console.log('user found')
        
    useEffect(() => {
        if (postUser) {
            const { red, green, blue, firstChar, secondChar } = getUserImgColor(postUser.nickname || postUser.username || 'undefined')

            // console.log(postUser.nickname || postUser.username || 'undefined')

            setUsernameFirstChar(firstChar)
            setUsernameSecondChar(secondChar)
            // console.log(`color: rgb(${red}, ${green}, ${blue})`)
            setUserBgColor(`rgb(${red}, ${green}, ${blue})`)
        }
        
    }, [mongoDBUser])


    // console.log('user: ');
    // console.log(user);
    // console.log('mongoDBUser: ');
    // console.log(mongoDBUser);
    // console.log('postUser: ');
    // console.log(postUser);
    // console.log('mongoDBPostUser: ');
    // console.log(mongoDBPostUser);
    
    // if (mongoDBUser) {
    //     console.log('user found')
    //     const { red, green, blue } = getUserImgColor(user.nickname || user.username)
    //     setUserBgColor(`rgb(${red}, ${green}, ${blue})`)
    // }

    const deletePost = async () => { 
        console.log('deleting...');
        // console.log(post)
        const res = await fetch(`/api/post/${post._id}`, {
            method: 'DELETE'

        })
        
        // console.log(res)
    }

    return (
        <>
            {!isLoading && postUser && mongoDBUser && (
                <div className="w-full relative p-1">
                    {console.log(postUser.nickname || postUser.username)}
                    <div className="flex items-center py-2">
                        <div className="h-50 cursor-pointer ml-5 relative overflow-hidden rounded-full z-10">
                            <Link href={`/api/user/${postUser._id}`}>
                                <>
                                    {
                                        postUser.picture
                                        ?
                                        <Image
                                            src={postUser.picture || testImg}
                                            width={'50'}
                                            height={'50'}
                                            fill="responsive"
                                        />
                                        :
                                        <div style={{background: userBgColor}} className='w-14 h-10 flex items-center justify-center text-white uppercase text-2xl font-semibold'>
                                                <div className='-translate-x-1'>
                                                    {postUser.nickname || postUser.username
                                                        ? 
                                                        `${usernameFirstChar}${usernameSecondChar}`
                                                        :
                                                        'un'
                                                    }
                                            </div>
                                        </div>
                                    }
                                </>
                            </Link>
                        </div>
                        <div className="flex w-full items-center justify-between px-4">
                            <Link href={`/api/user/${postUser._id}`}>
                                <h1 className="ml-2 cursor-pointer text-xl font-bold">{postUser.nickname || postUser.username || 'undefined'}</h1>
                            </Link>
                            <div className="text-2xl hover:cursor-pointer">
                                <Menu>
                                    <Menu.Button>
                                        <>
                                            <BiDotsVerticalRounded />
                                        </>
                                    </Menu.Button>
                                    <Menu.Items>
                                        <div className='fixed bottom-14 w-full sm:w-fit right-0 z-[60] rounded-lg text-2xl sm:text-lg sm:absolute sm:top-12 sm:right-1 sm:z-20 drop-shadow-lg'>
                                            <Menu.Item as='div' className='transition duration-300 hover:bg-gray-300 bg-gray-50 dark:hover:bg-zinc-600 cursor-pointer dark:bg-zinc-700 p-2 px-5 sm:p-1 sm:px-3 z-20'>
                                                {mongoDBUser._id === post.user ? 'Modifica' : 'Segnala' }
                                            </Menu.Item>
                                            <Menu.Item as='div' className='transition duration-300 hover:bg-gray-300 bg-gray-50 dark:hover:bg-zinc-600 cursor-pointer dark:bg-zinc-700 p-2 px-5 sm:p-1 sm:px-3 z-20'>Segui</Menu.Item>
                                            <Menu.Item as='div' className='transition duration-300 hover:bg-gray-300 bg-gray-50 dark:hover:bg-zinc-600 cursor-pointer dark:bg-zinc-700 p-2 px-5 sm:p-1 sm:px-3 z-20'>Aggiungi ai preferiti</Menu.Item>
                                            <Menu.Item as='div' className='transition duration-300 hover:bg-gray-300 bg-gray-50 dark:hover:bg-zinc-600 cursor-pointer dark:bg-zinc-700 p-2 px-5 sm:p-1 sm:px-3 z-20'>Aggiungi a raccolta</Menu.Item>
                                            {mongoDBUser._id === post.user && (
                                                <Menu.Item as='div' className='transition duration-300 hover:bg-gray-300 bg-gray-50 dark:hover:bg-zinc-600 cursor-pointer dark:bg-zinc-700 p-2 px-5 sm:p-1 sm:px-3 z-20' onClick={() => {
                                                    setShowDeleteModal(true)
                                                    // console.log(mongoDBUser._id)
                                                }}>Elimina</Menu.Item>
                                            )}
                                        </div>
                                    </Menu.Items>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div className='z-10 cursor-pointer'>
                        <Link href={`/api/post/${post._id}`}>
                            <>
                                {/* <Image src={post.img || testImg} width='400%' height='250%'  /> */}
                                <img src={post.img} width='100%'  />
                            </>
                        </Link>
                    </div>
                    <p className="text-lg p-2">
                        {post.content}
                    </p>
                    <div className="mt-3 flex items-center gap-x-5 text-xl">
                        <div className="ml-2 hover:cursor-pointer">
                            <AiOutlineLike />
                        </div>
                        <div className="hover:cursor-pointer">
                            <AiOutlineHeart />
                        </div>
                        <div className="hover:cursor-pointer">
                            <AiOutlineShareAlt />
                        </div>
                    </div>
                    <div className="mt-3 flex w-full items-center gap-x-2 text-lg">
                        <input
                        className="mr-5 w-full rounded-lg bg-transparent p-1 focus:outline-yellow-500"
                        type="text"
                        placeholder="Commenta..."
                        />
                        <button className="mr-5 rounded-lg bg-sky-100 p-1 px-5 transition duration-300 hover:bg-sky-200 dark:bg-slate-700 dark:hover:bg-slate-600">
                        Invia
                        </button>
                    </div>
                </div>
            )}
            {showDeleteModal && (
                <>
                    <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
                    <div className='fixed drop-shadow-lg text-center flex flex-col items-center sm:inset-52 z-[60] dark:bg-zinc-800 bg-gray-200 dark:text-white text-lg rounded-xl'>
                        <p className='text-3xl my-10'>Vuoi davvero eliminare questo post?</p>
                        <div className='w-full mt-20 p-3 px-7 flex items-center justify-around'>
                            <button onClick={() => setShowDeleteModal(false)} className='drop-shadow-lg p-2 px-10 rounded-lg text-lg font-semibold dark:bg-zinc-700 bg-zinc-300 transition duration-300 dark:hover:bg-zinc-600 hover:bg-zinc-400'>
                                No
                            </button>
                            <button onClick={() => {
                                setShowDeleteModal(false)
                                deletePost()
                            }} className='drop-shadow-lg p-2 px-10 rounded-lg text-lg font-semibold dark:bg-zinc-700 bg-zinc-300 transition duration-300 dark:hover:bg-zinc-600 hover:bg-zinc-400'>
                                Si
                            </button>
                        </div>
                    </div>
                </>
            )}
        </> 
    )   
}

export default Post
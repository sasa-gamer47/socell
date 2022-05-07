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
            const { red, green, blue, firstChar, secondChar } = getUserImgColor(postUser.name || postUser.nickname || postUser.username || 'undefined')

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
        // console.log('deleting...');
        // console.log(post)
        const res = await fetch(`/api/post/${post._id}`, {
            method: 'DELETE'

        })
        
        // console.log(res)
    }

    return (
        <>
            {!isLoading && postUser && mongoDBUser && (
                <div className="post-card relative w-full p-1">
                {/* {console.log(postUser.name || postUser.username, postUser)} */}
                <div className="flex items-center py-2">
                <div className="h-50 relative z-10 ml-5 cursor-pointer overflow-hidden rounded-full">
                    <Link href={`/api/user/${postUser._id}`}>
                    <div>
                        {postUser.picture ? (
                        <Image
                            src={postUser.picture || testImg}
                            width={'50'}
                            height={'50'}
                            fill="responsive"
                        />
                        ) : (
                        <div
                            style={{ background: userBgColor }}
                            className="flex h-10 w-14 items-center justify-center text-2xl font-semibold uppercase text-white"
                        >
                            <div className="-translate-x-1">
                            {postUser.name ||
                            postUser.nickname ||
                            postUser.username
                                ? `${usernameFirstChar}${usernameSecondChar}`
                                : 'un'}
                            </div>
                        </div>
                        )}
                    </div>
                    </Link>
                </div>
                <div className="flex w-full items-center justify-between px-4">
                    <Link href={`/api/user/${postUser._id}`}>
                    <h1 className="ml-2 cursor-pointer text-xl font-bold">
                        {postUser.name ||
                        postUser.nickname ||
                        postUser.username ||
                        'undefined'}
                    </h1>
                    </Link>
                    <div className="text-2xl hover:cursor-pointer">
                    <Menu>
                        <Menu.Button>
                        <>
                            <BiDotsVerticalRounded />
                        </>
                        </Menu.Button>
                        <Menu.Items>
                        <div className="fixed bottom-14 right-0 z-[60] w-full rounded-lg text-2xl drop-shadow-lg sm:absolute sm:top-12 sm:right-1 sm:z-20 sm:w-fit sm:text-lg">
                            <Menu.Item
                            as="div"
                            className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                            >
                            {mongoDBUser._id === post.user
                                ? 'Modifica'
                                : 'Segnala'}
                            </Menu.Item>
                            <Menu.Item
                            as="div"
                            className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                            >
                            Segui
                            </Menu.Item>
                            <Menu.Item
                            as="div"
                            className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                            >
                            Aggiungi ai preferiti
                            </Menu.Item>
                            <Menu.Item
                            as="div"
                            className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                            >
                            Aggiungi a raccolta
                            </Menu.Item>
                            {mongoDBUser._id === post.user && (
                            <Menu.Item
                                as="div"
                                className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                                onClick={() => {
                                setShowDeleteModal(true)
                                // console.log(mongoDBUser._id)
                                }}
                            >
                                Elimina
                            </Menu.Item>
                            )}
                        </div>
                        </Menu.Items>
                    </Menu>
                    </div>
                </div>
                </div>
                <div className="z-10 cursor-pointer">
                <Link href={`/api/post/${post._id}`}>
                    <div>
                    {/* <Image src={post.img || testImg} width='400%' height='250%'  /> */}
                    <img draggable="false" src={post.img} width="100%" />
                    </div>
                </Link>
                </div>
                <p className="p-2 text-lg">{post.content}</p>
                <div className="mt-3 flex items-center gap-x-5 text-xl">
                <div className="ml-2 hover:cursor-pointer">
                    <div className="flex items-center gap-x-3">
                    <AiOutlineLike />
                    <div className="text-sm">{post.likes}</div>
                    </div>
                </div>
                <div className="hover:cursor-pointer">
                    <div className="flex items-center gap-x-3">
                    <AiOutlineHeart />
                    <div className="text-sm">{post.favorites}</div>
                    </div>
                </div>
                <div className="hover:cursor-pointer">
                    <div>
                    <AiOutlineShareAlt />
                    </div>
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
                    {post.comments.length > -1 && (
                        <>
                            <div className='mt-3'></div>
                            <div className=" w-full bg-red-400 p-1 px-3">
                                <div className="text-md font-semibold">
                                Commenti: {post.comments.length}
                                </div>
                                <div className="flex w-full flex-col">
                                {/* comment template start */}
                                <div>
                                    <div className="relative flex items-center py-2">
                                    <div className="h-30 relative z-10 ml-5 cursor-pointer overflow-hidden rounded-full">
                                        <Link href={`/api/user/${postUser._id}`}>
                                        <div>
                                            {postUser.picture ? (
                                            <Image
                                                src={postUser.picture || testImg}
                                                width={'45'}
                                                height={'40'}
                                                fill="responsive"
                                            />
                                            ) : (
                                            <div
                                                style={{ background: userBgColor }}
                                                className="flex h-8 w-12 items-center justify-center text-xl font-semibold uppercase text-white"
                                            >
                                                <div className="-translate-x-1">
                                                {postUser.name ||
                                                postUser.nickname ||
                                                postUser.username
                                                    ? `${usernameFirstChar}${usernameSecondChar}`
                                                    : 'un'}
                                                </div>
                                            </div>
                                            )}
                                        </div>
                                        </Link>
                                    </div>
                                    <div className="flex w-full items-center justify-between px-4">
                                        <Link href={`/api/user/${postUser._id}`}>
                                        <h1 className="ml-2 cursor-pointer text-md font-semibold">
                                            {postUser.name ||
                                            postUser.nickname ||
                                            postUser.username ||
                                            'undefined'}
                                        </h1>
                                        </Link>
                                        <div className="text-2xl hover:cursor-pointer">
                                        <Menu>
                                            <Menu.Button>
                                            <>
                                                <BiDotsVerticalRounded />
                                            </>
                                            </Menu.Button>
                                            <Menu.Items>
                                            <div className="fixed bottom-14 right-0 z-[60] w-full rounded-lg text-xl sm:-top-0 sm:right-10 drop-shadow-lg sm:absolute sm:z-20 sm:w-fit sm:text-lg">
                                                <Menu.Item
                                                as="div"
                                                className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                                                >
                                                {mongoDBUser._id === post.user
                                                    ? 'Modifica'
                                                    : 'Segnala'}
                                                </Menu.Item>
                                                <Menu.Item
                                                as="div"
                                                className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                                                >
                                                Segui
                                                </Menu.Item>
                                                {mongoDBUser._id === post.user && (
                                                <Menu.Item
                                                    as="div"
                                                    className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                                                    onClick={() => {
                                                    setShowDeleteModal(true)
                                                    // console.log(mongoDBUser._id)
                                                    }}
                                                >
                                                    Elimina
                                                </Menu.Item>
                                                )}
                                            </div>
                                            </Menu.Items>
                                        </Menu>
                                        </div>
                                    </div>
                                    </div>
                                    <div className='px-4'>
                                                    uhnijmok,pl     fvygbuhnij
                                                    gtrferfgtr3rgttr4gtgt54t5
                                        t5gotg44p44
                                        tgtlpgtè4gè5t4pè            
                                    </div>
                                </div>
                                {/* comment template end */}
                                </div>
                            </div>
                            <div className=" w-full bg-red-400 p-1 px-3">
                                <div className="flex w-full flex-col">
                                {/* comment template start */}
                                <div>
                                    <div className="relative flex items-center py-2">
                                    <div className="h-30 relative z-10 ml-5 cursor-pointer overflow-hidden rounded-full">
                                        <Link href={`/api/user/${postUser._id}`}>
                                        <div>
                                            {postUser.picture ? (
                                            <Image
                                                src={postUser.picture || testImg}
                                                width={'45'}
                                                height={'40'}
                                                fill="responsive"
                                            />
                                            ) : (
                                            <div
                                                style={{ background: userBgColor }}
                                                className="flex h-8 w-12 items-center justify-center text-xl font-semibold uppercase text-white"
                                            >
                                                <div className="-translate-x-1">
                                                {postUser.name ||
                                                postUser.nickname ||
                                                postUser.username
                                                    ? `${usernameFirstChar}${usernameSecondChar}`
                                                    : 'un'}
                                                </div>
                                            </div>
                                            )}
                                        </div>
                                        </Link>
                                    </div>
                                    <div className="flex w-full items-center justify-between px-4">
                                        <Link href={`/api/user/${postUser._id}`}>
                                        <h1 className="ml-2 cursor-pointer text-md font-semibold">
                                            {postUser.name ||
                                            postUser.nickname ||
                                            postUser.username ||
                                            'undefined'}
                                        </h1>
                                        </Link>
                                        <div className="text-2xl hover:cursor-pointer">
                                        <Menu>
                                            <Menu.Button>
                                            <>
                                                <BiDotsVerticalRounded />
                                            </>
                                            </Menu.Button>
                                            <Menu.Items>
                                            <div className="fixed bottom-14 right-0 z-[60] w-full rounded-lg text-xl sm:-top-0 sm:right-10 drop-shadow-lg sm:absolute sm:z-20 sm:w-fit sm:text-lg">
                                                <Menu.Item
                                                as="div"
                                                className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                                                >
                                                {mongoDBUser._id === post.user
                                                    ? 'Modifica'
                                                    : 'Segnala'}
                                                </Menu.Item>
                                                <Menu.Item
                                                as="div"
                                                className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                                                >
                                                Segui
                                                </Menu.Item>
                                                {mongoDBUser._id === post.user && (
                                                <Menu.Item
                                                    as="div"
                                                    className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                                                    onClick={() => {
                                                    setShowDeleteModal(true)
                                                    // console.log(mongoDBUser._id)
                                                    }}
                                                >
                                                    Elimina
                                                </Menu.Item>
                                                )}
                                            </div>
                                            </Menu.Items>
                                        </Menu>
                                        </div>
                                    </div>
                                    </div>
                                    <div className='px-4'>
                                                    uhnijmok,pl     fvygbuhnij
                                                    gtrferfgtr3rgttr4gtgt54t5
                                        t5gotg44p44
                                        tgtlpgtè4gè5t4pè            
                                    </div>
                                </div>
                                {/* comment template end */}
                                </div>
                            </div>
                            <div className=" w-full bg-red-400 p-1 px-3">
                                <div className="flex w-full flex-col">
                                {/* comment template start */}
                                <div>
                                    <div className="relative flex items-center py-2">
                                    <div className="h-30 relative z-10 ml-5 cursor-pointer overflow-hidden rounded-full">
                                        <Link href={`/api/user/${postUser._id}`}>
                                        <div>
                                            {postUser.picture ? (
                                            <Image
                                                src={postUser.picture || testImg}
                                                width={'45'}
                                                height={'40'}
                                                fill="responsive"
                                            />
                                            ) : (
                                            <div
                                                style={{ background: userBgColor }}
                                                className="flex h-8 w-12 items-center justify-center text-xl font-semibold uppercase text-white"
                                            >
                                                <div className="-translate-x-1">
                                                {postUser.name ||
                                                postUser.nickname ||
                                                postUser.username
                                                    ? `${usernameFirstChar}${usernameSecondChar}`
                                                    : 'un'}
                                                </div>
                                            </div>
                                            )}
                                        </div>
                                        </Link>
                                    </div>
                                    <div className="flex w-full items-center justify-between px-4">
                                        <Link href={`/api/user/${postUser._id}`}>
                                        <h1 className="ml-2 cursor-pointer text-md font-semibold">
                                            {postUser.name ||
                                            postUser.nickname ||
                                            postUser.username ||
                                            'undefined'}
                                        </h1>
                                        </Link>
                                        <div className="text-2xl hover:cursor-pointer">
                                        <Menu>
                                            <Menu.Button>
                                            <>
                                                <BiDotsVerticalRounded />
                                            </>
                                            </Menu.Button>
                                            <Menu.Items>
                                            <div className="fixed bottom-14 right-0 z-[60] w-full rounded-lg text-xl sm:-top-0 sm:right-10 drop-shadow-lg sm:absolute sm:z-20 sm:w-fit sm:text-lg">
                                                <Menu.Item
                                                as="div"
                                                className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                                                >
                                                {mongoDBUser._id === post.user
                                                    ? 'Modifica'
                                                    : 'Segnala'}
                                                </Menu.Item>
                                                <Menu.Item
                                                as="div"
                                                className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                                                >
                                                Segui
                                                </Menu.Item>
                                                {mongoDBUser._id === post.user && (
                                                <Menu.Item
                                                    as="div"
                                                    className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                                                    onClick={() => {
                                                    setShowDeleteModal(true)
                                                    // console.log(mongoDBUser._id)
                                                    }}
                                                >
                                                    Elimina
                                                </Menu.Item>
                                                )}
                                            </div>
                                            </Menu.Items>
                                        </Menu>
                                        </div>
                                    </div>
                                    </div>
                                    <div className='px-4'>
                                                    uhnijmok,pl     fvygbuhnij
                                                    gtrferfgtr3rgttr4gtgt54t5
                                        t5gotg44p44
                                        tgtlpgtè4gè5t4pè            
                                    </div>
                                </div>
                                {/* comment template end */}
                                </div>
                            </div>
                        </>
                    )}
            </div>
        )}
        {showDeleteModal && (
            <>
                <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
                <div className="fixed z-[60] flex flex-col items-center rounded-xl bg-gray-200 text-center text-lg drop-shadow-lg dark:bg-zinc-800 dark:text-white sm:inset-52">
                <p className="my-10 text-3xl">
                    Vuoi davvero eliminare questo post?
                </p>
                <div className="mt-20 flex w-full items-center justify-around p-3 px-7">
                    <button
                    onClick={() => setShowDeleteModal(false)}
                    className="rounded-lg bg-zinc-300 p-2 px-10 text-lg font-semibold drop-shadow-lg transition duration-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                    >
                    No
                    </button>
                    <button
                    onClick={() => {
                        setShowDeleteModal(false)
                        deletePost()
                    }}
                    className="rounded-lg bg-zinc-300 p-2 px-10 text-lg font-semibold drop-shadow-lg transition duration-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                    >
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
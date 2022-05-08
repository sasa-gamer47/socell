import React, { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { getUser, getUserImgColor, getUserById } from '../utils'
import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { AiOutlineLike, AiOutlineHeart } from 'react-icons/ai'
import { BsReplyAll, BsReplyAllFill } from 'react-icons/bs'
import Image from 'next/image'


const Comment = ({ comment }) => {

    console.log(comment);

    const { user, isLoading } = useUser()
    const [mongoDBUser, setMongoDBUser] = useState(null)
    const [userBgColor, setUserBgColor] = useState(null)
    const [usernameFirstChar, setUsernameFirstChar] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)


    useEffect(() => {
        async function getUser() {
            const response = await fetch(`/api/user/${comment.user}`)
            const user = await response.json()
            // console.log(user.data);
            // setPostUser(user.data)
            setMongoDBUser(user.data)
        }
        getUser()
    }, [])
    const [usernameSecondChar, setUsernameSecondChar] = useState(null)

    const deleteComment = async () => {
        // console.log('deleting...');
        // console.log(post)
        const res = await fetch(`/api/comment/${comment._id}`, {
            method: 'DELETE',
        })

        // console.log(res)
    }
    
    useEffect(() => {
        if (mongoDBUser) {
            const { red, green, blue, firstChar, secondChar } = getUserImgColor(
            mongoDBUser.name || mongoDBUser.nickname || mongoDBUser.username || 'undefined'
        )

            // console.log(mongoDBUser.nickname || mongoDBUser.username || 'undefined')

            setUsernameFirstChar(firstChar)
            setUsernameSecondChar(secondChar)
            // console.log(`color: rgb(${red}, ${green}, ${blue})`)
            setUserBgColor(`rgb(${red}, ${green}, ${blue})`)
        }

    }, [mongoDBUser])
    


    return (
        <div>
            {!isLoading && mongoDBUser && (
            <div>
                <div className="relative flex items-center py-2">
                <div className="h-30 relative z-10 ml-5 cursor-pointer overflow-hidden rounded-full">
                    <Link href={`/api/user/${mongoDBUser._id}`}>
                    <div>
                        {mongoDBUser.picture ? (
                        <Image
                            src={mongoDBUser.picture || testImg}
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
                            {mongoDBUser.name ||
                            mongoDBUser.nickname ||
                            mongoDBUser.username
                                ? `${usernameFirstChar}${usernameSecondChar}`
                                : 'un'}
                            </div>
                        </div>
                        )}
                    </div>
                    </Link>
                </div>
                <div className="flex w-full items-center justify-between px-4">
                    <Link href={`/api/user/${mongoDBUser._id}`}>
                    <h1 className="text-md ml-2 cursor-pointer font-semibold">
                        {mongoDBUser.name ||
                        mongoDBUser.nickname ||
                        mongoDBUser.username ||
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
                        <div className="fixed bottom-14 right-0 z-[60] w-full rounded-lg text-xl drop-shadow-lg sm:absolute sm:-top-0 sm:right-10 sm:z-20 sm:w-fit sm:text-lg">
                            <Menu.Item
                            as="div"
                            className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                            >
                            {mongoDBUser.email === user.email
                                ? 'Modifica'
                                : 'Segnala'}
                            </Menu.Item>
                            <Menu.Item
                            as="div"
                            className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                            >
                            Segui
                            </Menu.Item>
                            {mongoDBUser.email === user.email && (
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
                <div className="px-4">{comment.content}</div>
                <div className="mt-3 flex items-center gap-x-5 text-xl">
                    <div className="ml-2 hover:cursor-pointer">
                        <div className="flex items-center gap-x-3 text-lg ml-5">
                            <AiOutlineLike />
                        <div className="text-sm">{comment.likes}</div>
                        </div>
                    </div>
                    <div className="ml-2 hover:cursor-pointer">
                        <div className="flex items-center gap-x-3 text-lg">
                            <AiOutlineHeart />
                        <div className="text-sm">{comment.favorites}</div>
                        </div>
                    </div>
                    <div className="hover:cursor-pointer">
                        <div className="flex items-center gap-x-3 text-lg">
                            <BsReplyAll />
                                {/* <div className="text-sm">{comment.favorites}</div> */}
                                {/*  will set (maybe) the replies count */}
                        </div>
                    </div>
                </div>    
            </div>
        )}
        {showDeleteModal && (
        <>
            <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
            <div className="fixed z-[60] flex flex-col items-center rounded-xl bg-gray-200 text-center text-lg drop-shadow-lg dark:bg-zinc-800 dark:text-white sm:inset-52">
            <p className="my-10 text-3xl">
                Vuoi davvero eliminare questo commento?
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
                    deleteComment()
                }}
                className="rounded-lg bg-zinc-300 p-2 px-10 text-lg font-semibold drop-shadow-lg transition duration-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                >
                Si
                </button>
            </div>
            </div>
        </>
        )}
    </div>
    )
}

export default Comment
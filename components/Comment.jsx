import React, { useState, useEffect, useRef } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { getUser, getUserImgColor, getUserById } from '../utils'
import  { useRouter } from 'next/router'
import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { AiOutlineLike, AiFillLike, AiOutlineHeart } from 'react-icons/ai'
import { BsReplyAll, BsReplyAllFill } from 'react-icons/bs'
import Image from 'next/image'


const Comment = ({ comment, currentUser }) => {

    // console.log(comment);

    const { user, isLoading } = useUser()
    const [isMobile, setIsMobile] = useState(null)
    const commentText = useRef(null)
    const router = useRouter()
    const { pathname, query } = useRouter()
    const [mongoDBUser, setMongoDBUser] = useState(null)
    const [userBgColor, setUserBgColor] = useState(null)
    const [usernameFirstChar, setUsernameFirstChar] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [hasLiked, setHasLiked] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)
    const [editedContent, setEditedContent] = useState(comment.content)
    const [isCanceled, setIsCanceled] = useState(false)




    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth <= 768)
            window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth <= 768)
            })
        }
    }, [])

    useEffect(() => {
        async function getUser() {
            const response = await fetch(`/api/user/${comment.user}`)
            const user = await response.json()
            // console.log(user.data);
            // setPostUser(user.data)
            setMongoDBUser(user.data)
        }
        getUser()

        console.log('comment user: ', comment.user);

    }, [])
    const [usernameSecondChar, setUsernameSecondChar] = useState(null)

    const deleteComment = async () => {
        // console.log('deleting...');
        // console.log(post)
        const res = await fetch(`/api/comment/${comment._id}`, {
            method: 'DELETE',
        })

        const data = await res.json()

        if (data.success) {
            // console.log('deleted');
            // setShowDeleteModal(false)
            // window.location.reload()
            router.push({ pathname, query: { ...query, updateComments: true } })
        }

        // console.log(res)
    }
    
    useEffect(() => {
        if (mongoDBUser) {
            const { red, green, blue, firstChar, secondChar } = getUserImgColor(
            mongoDBUser.name || mongoDBUser.nickname || mongoDBUser.username || 'undefined'
            )

            if (currentUser) {
                comment.userHaveLiked.indexOf(currentUser._id) !== -1 ? setHasLiked(true) : setHasLiked(false)
            }
        
            // console.log(mongoDBUser.nickname || mongoDBUser.username || 'undefined')

            setUsernameFirstChar(firstChar)
            setUsernameSecondChar(secondChar)
            // console.log(`color: rgb(${red}, ${green}, ${blue})`)
            setUserBgColor(`rgb(${red}, ${green}, ${blue})`)
        }

    }, [mongoDBUser])

    const editComment = (element) => {
        setIsEditing(true)




        // router.push({ pathname: `/comment/${comment._id}/edit`, query: { userId: mongoDBUser._id } })
    }

    if (commentText.current && !hasLoaded) {
        commentText.current.value = comment.content
        commentText.current.focus()
        commentText.current.select()

        console.log('edit comment')
        console.log(comment)

        setEditedContent(commentText.current.value)

        setHasLoaded(true)
    }

    const confirmEditComment = async () => {
        console.log('confirm edit comment');

        const res = await fetch(`/api/comment/${comment._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: comment._id,
                content: editedContent,
            })

        })

        const data = await res.json()

        setIsEditing(false)

        if (data.success) {
            //     // setShowDeleteModal(false)
            console.log('edited');
        //     // window.location.reload()
            router.push({ pathname, query: { ...query, updateComments: true } })
        }

        // console.log(res)

    }

    const cancelEditComment = () => {
        setHasLoaded(false)
        setIsEditing(false)
        commentText.current.value = comment.content
    }
    
    const handleLike = async () => {
      // console.log('-----------------');
      // console.log(post.userHaveLiked.indexOf(post.user))
      // console.log(post.userHaveLiked)

        const index = comment.userHaveLiked.indexOf(currentUser._id)

        console.log('testing pre-function');
        console.log('index: ', index);
        // console.log('hasLiked: ', hasLiked);
        console.log('currentUser._id: ', currentUser._id);
        console.log('users: ', comment.userHaveLiked)


        if (index === -1) {
            console.log('like added')
            console.log('users: ', [...comment.userHaveLiked, currentUser._id])
            console.log('users: ', comment.userHaveLiked)
            console.log('index: ', index)
            const res = await fetch(`/api/like/comment/${comment._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: comment._id,
                users: [...comment.userHaveLiked, currentUser._id],
                likes: comment.likes + 1,
            }),
            })

            setHasLiked(true)

            const data = await res.json()
            console.log('data: ', data)
        } else {
            console.log('you have already liked this comment')
            const index = comment.userHaveLiked.indexOf(currentUser._id)
            // console.log('users: ', comment.userHaveLiked.splice(index, 1))
            comment.userHaveLiked.splice(index, 1)

            const res = await fetch(`/api/like/comment/${comment._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: comment._id,
                users: comment.userHaveLiked,
                likes: comment.likes - 1,
            }),
            })

            setHasLiked(false)

            const data = await res.json()
            console.log('data: ', data)
        }

        router.push({ pathname, query: { ...query, updateComments: true } })
    }

    return (
        <div>
            {!isLoading && mongoDBUser && (
            <div>
                <div className="relative flex itessdms-center py-2">
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
                            {isEditing && (
                                <Menu.Item
                                    as="div"
                                    className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                                    onClick={() => cancelEditComment()}
                                    >
                                    Cancella
                                </Menu.Item>               
                            )}             
                            <Menu.Item
                            as="div"
                            className="z-20 cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 sm:p-1 sm:px-3"
                            >
                                {mongoDBUser.email === user.email
                                    ? 
                                        isEditing 
                                            ? <p onClick={() => confirmEditComment()}>Conferma</p>
                                            : <p onClick={() => editComment()}>Modifica</p>
                                    : 'Segnala'
                                }
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
                    {!isEditing
                        ? <div className="px-4">{comment.content}</div>
                        : isMobile 
                            ?
                                (
                                    <div className='fixed bottom-14 z-[70] flex flex-col justify-center items-center w-full'>
                                        <div className='flex w-full'>
                                            <div className='cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 w-full' onClick={() => cancelEditComment()}>Cancella</div>
                                            <div className='cursor-pointer bg-gray-50 p-2 px-5 transition duration-300 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 w-full' onClick={() => confirmEditComment()}>Conferma</div>
                                        </div>
                                        <textarea onChange={() => setEditedContent(commentText.current.value)} ref={commentText} name="" id="" placeholder='Commenta...' className=" z-[70] h-40 sm:h-20 sm:h-auto w-full sm:w-auto sm:relative px-4 bg-zinc-800 outline-none" ></textarea>
                                    </div>
                                    )
                            : <textarea onChange={() => setEditedContent(commentText.current.value)} ref={commentText} name="" id="" placeholder='Commenta...' className=" ml-5 w-9/12 rounded-lg h-20 px-4 bg-zinc-800 outline-none" ></textarea>
                    }
                <div className="mt-3 flex items-center gap-x-5 text-xl">
                    <div className="ml-2 hover:cursor-pointer" onClick={() => handleLike()}>
                        <div className="flex items-center gap-x-3 text-lg ml-5">
                                {hasLiked ? <AiFillLike /> : <AiOutlineLike />}
                                {hasLiked
                                    ? <div className="text-sm">{comment.likes}</div> // + 1
                                    : <div className="text-sm">{comment.likes}</div> // maybe - 1
                                }
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
                            <div className="text-sm">{comment.repliesCount}</div>
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
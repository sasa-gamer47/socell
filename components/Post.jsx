import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { AiOutlineLike, AiFillLike, AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { Menu } from '@headlessui/react'
import testImg from '../images/testImg.jpg'
import testImg2 from '../images/testImg2.jpg'
import { getUser, getUserImgColor, getUserById } from '../utils'
import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import { Comment } from './'

const Post = ({ post }) => {

    const { user, isLoading } = useUser()
    const router = useRouter()
    const { pathname, query } = useRouter()
    const commentContent = useRef(null)
    const [postUser, setPostUser] = useState(null)
    const [mongoDBUser, setMongoDBUser] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [userBgColor, setUserBgColor] = useState(null)
    const [usernameFirstChar, setUsernameFirstChar] = useState(null)
    const [usernameSecondChar, setUsernameSecondChar] = useState(null)
    const [comments, setComments] = useState([])
    const [showMoreComments, setShowMoreComments] = useState(false)
    const [hasLiked, setHasLiked] = useState(false)
    const [isMongDBUserSet, setIsMongDBUserSet] = useState(false)

    
    async function getComments() { 
        const res = await fetch(`/api/comment/post/${post._id}`)
        const comments = await res.json()

        // console.log('comments: ', comments);
        setComments(comments.data)

        // if (updateComments) {
        //     //! doesn't work
        //     console.log('comments updated');
        //     setTimeout(() => setUpdateComments(false), 50)
        // }
    }

    
    useEffect(() => {
        getComments()
        
    

    }, [])

    useEffect(() => {
        if (query.updateComments === 'true') {
            // console.log('comments updated');
            getComments()
            router.push('/')
        }
    }, [pathname, query])
    

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

        post.userHaveLiked.indexOf(post.user) !== -1 ? setHasLiked(true) : setHasLiked(false)


    }, [])
    
    

    
    if (user && !mongoDBUser && !isMongDBUserSet) {
        console.log(mongoDBUser, );
        console.log('user has been modified', user);
        getUser(user, setMongoDBUser)
    }
    
    
    // console.log('user found')
    
    useEffect(() => {
        setIsMongDBUserSet(true)
        console.log('mongoDBUser now exists');
        if (postUser) {
            const { red, green, blue, firstChar, secondChar } = getUserImgColor(postUser.name || postUser.nickname || postUser.username || 'undefined')

            // console.log(postUser.nickname || postUser.username || 'undefined')

            setUsernameFirstChar(firstChar)
            setUsernameSecondChar(secondChar)
            // console.log(`color: rgb(${red}, ${green}, ${blue})`)
            setUserBgColor(`rgb(${red}, ${green}, ${blue})`)
        }
        
    }, [mongoDBUser])

    const handleLike = async () => {
        // console.log('-----------------');
        // console.log(post.userHaveLiked.indexOf(post.user))
        // console.log(post.userHaveLiked)
        const index = post.userHaveLiked.indexOf(mongoDBUser._id)
        
        if (index === -1) {
            console.log('like added');
            console.log('users: ', [...post.userHaveLiked, mongoDBUser._id])
            // console.log('users: ', post.userHaveLiked)
            console.log('index: ', index)
            const res = await fetch(`/api/like/post/${post._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post: post._id,
                    users: [...post.userHaveLiked, mongoDBUser._id],
                    likes: post.likes + 1
                })
        
            })

            setHasLiked(true)
            
            const data = await res.json()
            console.log('data: ', data);
        } else {
            console.log('you have already liked this post');
            const index = post.userHaveLiked.indexOf(mongoDBUser._id)
            // console.log('users: ', post.userHaveLiked.splice(index, 1))
            post.userHaveLiked.splice(index, 1)

                const res = await fetch(`/api/like/post/${post._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        post: post._id,
                        users: post.userHaveLiked,
                        likes: post.likes - 1
                    })
            
                })
            
            
                setHasLiked(false)
    
                const data = await res.json()
                console.log('data: ', data);
            }



    }

    const submitComment = async () => { 
        console.log('text: ', commentContent.current.value);
        if (commentContent.current.value.trim() !== '' && mongoDBUser) { 
            console.log('submitting comment...');
            console.log(commentContent.current.value);
            const comment = commentContent.current.value

            console.log('comment data: ', {
                user: mongoDBUser._id,
                post: post._id,
                comment,
                isReply: false,
            })
            const res = await fetch(`/api/comment/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: mongoDBUser._id,
                    post: post._id,
                    content: comment,
                    isReply: false,
                })
            })
            const data = await res.json()
            console.log('comment data response: ', data);
            // setUpdateComments(true)
            // setShowMoreComments(false)
            commentContent.current.value = ''
            getComments()
        }

    }


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
            {!isLoading && comments && postUser && mongoDBUser && (
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
                            {mongoDBUser._id !== post.user && <p>Segui</p>}
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
                <div className="ml-2 hover:cursor-pointer" onClick={() => handleLike()}>
                    <div className="flex items-center gap-x-3">
                        {hasLiked ? <AiFillLike /> : <AiOutlineLike />}
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
                    <div className="flex items-center gap-x-3">
                        <AiOutlineShareAlt />
                        <div className="text-sm">{post.shares}</div>
                    </div>
                </div>
                </div>
                <div className="mt-3 flex w-full items-center gap-x-2 text-lg">
                <textarea
                    ref={commentContent}
                    className="mr-5 w-full rounded-lg bg-transparent p-1 focus:outline-yellow-500"
                    placeholder="Commenta..."
                    rows="1"
                />
                <button onClick={() => submitComment()} className="mr-5 rounded-lg bg-sky-100 p-1 px-5 transition duration-300 hover:bg-sky-200 dark:bg-slate-700 dark:hover:bg-slate-600">
                    Invia
                </button>
                </div>
                    {/* {post.comments.length > 0 && ( */}
                    {/* {console.log('length: ', comments.length)} */}
                    {comments.length > 0 && (
                        <>
                            <div className='mt-3'></div>
                            {comments.length <= 2
                                ?
                                (
                                    <div>    
                                        {comments.map((comment, index) => (
                                            <Comment key={index} comment={comment} />
                                            ))}
                                    </div>
                                )
                                :
                                (
                                    <>
                                        <div>
                                            {comments.slice(0, 2).map((comment, index) => (
                                                <Comment key={index} comment={comment} />
                                            ))}
                                        </div>
                                        <div onClick={() => setShowMoreComments(true)} className='font-semibold text-sky-400 underline ml-5 mt-3 cursor-pointer'>
                                            Mostra gli altri {comments.length - 2} commenti
                                        </div>
                                    </>
                                )
                            }
                            {/* {console.log('tgrefrerergterr')} */}
                            {/* {comments.map(comment => {
                                console.log('commenttttt: ',  comment);
                            })} */}

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
            {showMoreComments && (
                <div>
                    <div className='fixed opacity-50 inset-0 mt-14 z-[70] bg-black'></div>
                    <div className='inset-6 bottom-20 top-20 bg-gray-200 dark:bg-zinc-800 fixed z-[70]'>
                        <div className="flex gap-x-5 items-center w-full absolute drop-shadow-lg top-0 h-12 bg-gray-300 dark:bg-zinc-900">
                            <div onClick={() => setShowMoreComments(false)}>
                                [back btn]
                            </div>
                            <div>
                                Commenti: {comments.length}
                            </div>
                            <div>
                                [something else]
                            </div>
                        </div>
                        <div className='absolute top-12 bottom-0 overflow-y-auto flex flex-col justify-center w-full '>
                            {comments.map((comment, index) => (
                                <Comment key={index} comment={comment} />
                            ))}
                        </div>
                    </div>

                </div>
            )}
        </>
    )   
}

export default Post
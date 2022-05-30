import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'

const Edit = () => {

    // i will give the possibility to choose how to edit the comment, in this page, or directly within teh comments seing
    // if all will work



    const { user, isLoading } = useUser()
    const router = useRouter()
    const { query: { commentId, userId } } = router
    const [comment, setComment] = useState(null)
    const [mongoDBUser, setMongoDBUser] = useState(null)
    const content = useRef(null)
    const [hasLoaded, setHasLoaded] = useState(false)
    const [text, setText] = useState('')

    async function getComment(id) {
        const response = await fetch(`/api/comment/${id}`)
        const comment = await response.json()
        setComment(comment.data)

        return comment.data
    }

    async function getUser(id) {
            const response = await fetch(`/api/user/${id}`)
            const user = await response.json()
            // console.log('------------');
            // console.log(user);
        setMongoDBUser(user.data)
    }
    
    useEffect(() => {
        if (commentId) {
            const comment = getComment(commentId)
            getUser(userId)
            // router.push(`/comment/${commentId}/edit`)
        
            // console.log(content);
            
        }
    }, [router])
    
    if (content.current && !hasLoaded) {
        console.log(content);
        content.current.value = comment.content
        content.current.focus()
        content.current.select()

        setHasLoaded(true)
    }

    const submitComment = async () => {
        console.log('confirm edit comment')

        const res = await fetch(`/api/comment/${comment._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: commentId,
            content: text,
        }),
    })

        const data = await res.json()

        if (data.success) {
            console.log('edited');
            // setShowDeleteModal(false)
            // window.location.reload()
            router.push({ pathname: '/', query: { updateComments: true } })
        }

        // console.log(res)
    }

    return (
        <div className='absolute flex items-center justify-center dark:text-white bottom-14 sm:bottom-0 top-14 w-full'>
            {comment && mongoDBUser && user.email === mongoDBUser.email && (
                <>
                    <div className='drop-shadow-lg w-10/12 sm:w-4/12 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex flex-col items-center gap-y-2'>
                        <textarea className='text-lg resize-y h-40 w-full mt-5 bg-transparent p-3 outline-none rounded-lg' onChange={() => {
                            // console.log(content.current.value)
                            setText(content.current.value)
                        }} ref={content} name="" id="" placeholder='Commenta...'></textarea>

                        <button onClick={() => submitComment()} className='drop-shadow-lg w-10/12 sm:w-4/12 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex flex-col items-center gap-y-2'>Conferma</button>

                    </div>
                </>
            )}
        </div>
    )
}

export default Edit

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import path from 'path'
// import base64 from 'base-64'
// import cloudinary from 'cloudinary'
// import uploadcare from 'uploadcare-widget'
// const cloudinary = require('cloudinary-core').Cloudinary.new()
// import { AdvancedImage } from '@cloudinary/react'
// import { Cloudinary } from '@cloudinary/url-gen'
import { getUserById } from '../../utils'
import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
// import { getDirectory } from '../../utils'

const New = () => {

    
    // const cloudinary = require('cloudinary').v2
    const { user, isLoading } = useUser()
    const [User, setUser] = useState(null)
    const content = useRef(null)
    const [image, setImage] = useState('')
    const router = useRouter()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { query: { id } } = router
    const [tags, setTags] = useState([])
    const [showNewTagContent, setShowNewTagContent] = useState(false)
    const tagContentRef = useRef(null)

    

    

    useEffect(() => {
        console.log('current image: ', image);
    }, [image])
    // console.log(router);

    useEffect(() => {
        // console.log(user.email === User.email)
        // if (id) {
            // console.log('initialazing');
            // }
            // getDirectory()
        }, [])
    async function getUser() {
        if (id) {
            const response = await fetch(`/api/user/${id}`)
            const user = await response.json()
            // console.log('------------');
            // console.log(user);
            setUser(user.data)
                
        } else {
            console.log("user couldn't be retrieved")
        }
    }
        getUser()

    const createNewTag = () => {
        setShowNewTagContent(false)
        
        const content = tagContentRef.current.value
        
        content ? setTags(prevState => [...prevState, content]) : null
    }
        

    return (
        <div>
            {User && user.email === User.email && !isLoading && (
                <>
                    <div className='absolute flex items-center justify-center dark:text-white bottom-14 sm:bottom-0 top-14 w-full'>
                        {console.log('userrrrrr: ', user, User )}
                        {/* <img src={url} ref={img} width='500' height='500' /> */}
                        <form method='POST' action='/api/post/'
                            onSubmit={async (e) => {
                            e.preventDefault()
                            // console.log(e);

                            // const formData = new FormData()
                            // formData.append('image', files)
                            // formData.append('content', content.current.value)

                            // console.log(formData);
                            if (!loading) {

                                const fileInput = Array.from(e.currentTarget.elements).find(({ name }) => name === 'file');

                                const formData = new FormData()

                                for (const file of fileInput.files) {
                                    formData.append('file', file)
                                }

                                formData.append('upload_preset', 'my-uploads')

                                // console.log('user: ', user);
                                
                                const currentDate = new Date()

                                const data = await fetch('https://api.cloudinary.com/v1_1/dcrsevgpq/image/upload', {
                                    method: 'POST',
                                    body: formData
                                }).then(r => r.json()).then(data => {
                                    console.log('cldnr response', data)
                                    if (data) {
                                        setSuccess(true)
                                        // setUser({...user, posts: [...user.posts, {  })
                                        
                                        // resource type
                                        setImage(data.secure_url)

                                        fetch('/api/post/', {
                                            method: 'POST',
                                            body: JSON.stringify({
                                                img: data.secure_url,
                                                content: content.current.value,
                                                user: id,
                                                comments: [],
                                                createdAt: currentDate,
                                                tags,
                                            }),
                                            headers: {
                                                'content-type': 'application/json'
                                            },
                                        })
                                            .then((res) => res.json())
                                            .then((res) => {
                                                console.log(res)
                
                
                                                if (res.success) {
                                                    setSuccess(true)
                
                                                    setTimeout(() => {
                                                        setSuccess(false)
                                                    }, 100)
                                                    setTimeout(() => {
                                                        router.push('/')
                                                    }, 200)
                                                }
                                            })
                                    } else {
                                        setError(true)

                                        setTimeout(() => {
                                            setError(false)
                                        }, 1000)
                                    }
                                
                                })

                                // setUploadData(data);
                            

                                // console.log({
                                //     img: image,
                                //     content: content.current.value,
                                //     user: id,
                                //     comments: [],
                                // })
                                console.log('image: ', image);
                            
                        
                            }


                        }} className='drop-shadow-lg w-10/12 sm:w-4/12 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex flex-col items-center gap-y-2'>
                            <h1 className='text-3xl font-semibold mb-4 mt-2'>Crea un nuovo post</h1>
                            <input onChange={(e) => {
                                const file = e.currentTarget.files[0]
                                console.log('current file: ', file);
                                const reader = new FileReader()
                                reader.onload = (e) => {
                                    setImage(e.target.result)
                                }
                                reader.readAsDataURL(file)

                            }} className='file:rounded-lg file:border-0 file:outline-0 file:bg-zinc-300 dark:file:bg-zinc-600 dark:file:text-white file:p-1 file:px-4 file:text-lg file:mr-5 file:cursor-pointer transition file:duration-300 file:hover:bg-zinc-400 dark:file:hover:bg-zinc-500 ' type="file" name="file" id="file" />
                            {image && image !== '' && (
                                <div className='w-full flex items-center justify-center'>
                                    <div className='w-1/3f'>
                                        {/* {console.log('current url', image)} */}
                                        <img src={image} />
                                    </div>
                                </div>
                            )}
                            <textarea ref={content} name="" id="" className='text-lg resize-y h-40 w-full mt-5 bg-transparent p-3 outline-none rounded-lg' placeholder='Scrivi qui ciò che pensi...'></textarea>
                            <div className='w-full py-2 px-3 mb-5 grid gap-2 gap-y-1 grid-cols-3 sm:grid-cols-4'>
                                {tags.map((tag, index) => (
                                    <div type="text" className='relative py-2 text-center flex items-center justify-center font-semibold text-sm sm:text-lg dark:text-white bg-zinc-200 dark:bg-zinc-600 drop-shadow-lg rounded-lg transition duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-500'>
                                        {tag}
                                        <div onClick={() => {
                                            const index = tags.indexOf(tag)
                                            tags.splice(index, 1)
                                            setTags(tags)
                                        }} className='absolute top-0 right-0 w-5 h-5 flex text-center items-center justify-center  bg-red-400 rounded-lg p-1 cursor-pointer text-white'>&times;</div>
                                    </div>
                                ))}
                                <div onClick={() => setShowNewTagContent(true)} className='text-center flex items-center justify-center font-semibold text-2xl dark:text-white bg-zinc-200 dark:bg-zinc-600 drop-shadow-lg w-10 h-10 rounded-lg cursor-pointer transition duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-500'>+</div>
                            </div>
                            <input className={`${success ? 'bg-green-500' : ''} mt-10 mb-5 text-lg font-semibold p-2 px-7 rounded-lg drop-shadow-lg cursor-pointer bg-zinc-300 dark:bg-zinc-600 transition duration-300 hover:bg-zinc-400 dark:hover:bg-zinc-500 hover:-translate-y-2 hover:scale-110`} type="submit" value={
                                success
                                    ?
                                    'Post Pubblicato'
                                    :
                                    error ? 'Errore nella pubblicazione' : 'Crea Post'
                            } />
                        </form>
                    </div>
                    {showNewTagContent && (
                        <>
                            <div className='fixed z-40 inset-0 opacity-60 bg-black' onClick={() => setShowNewTagContent(false)}></div>
                            <div className='flex flex-col items-center justify-center fixed bottom-14 text-center dark:bg-zinc-700 bg-zinc-200 z-[60] w-full sm:rounded-lg text-xl drop-shadow-lg sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-52 sm:bottom-52 sm:w-3/12 sm:z-50 sm:text-lg'>
                                <input ref={tagContentRef} className='w-full sm:w-fit outline-none py-2 text-center flex items-center justify-center font-semibold text-lg dark:text-white bg-zinc-200 dark:bg-zinc-600 drop-shadow-lg rounded-lg transition duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-500' type="text" placeholder='Inserisci il tag' />
                                <div onClick={() => createNewTag()} className=' mt-10 mb-5 text-lg font-semibold p-2 px-7 rounded-lg drop-shadow-lg cursor-pointer bg-zinc-300 dark:bg-zinc-600 transition duration-300 hover:bg-zinc-400 dark:text-white dark:hover:bg-zinc-500 hover:-translate-y-2 hover:scale-110'>Crea tag</div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}



export default New
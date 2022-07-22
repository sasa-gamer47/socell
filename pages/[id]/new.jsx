import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
// import base64 from 'base-64'
// import cloudinary from 'cloudinary'
// import uploadcare from 'uploadcare-widget'
// const cloudinary = require('cloudinary-core').Cloudinary.new()
// import { AdvancedImage } from '@cloudinary/react'
// import { Cloudinary } from '@cloudinary/url-gen'
import { getUserById } from '../../utils'
import { useUser } from '@auth0/nextjs-auth0'

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
    // console.log(router);

    useEffect(() => {
        // console.log(user.email === User.email)
        // if (id) {
            // console.log('initialazing');
            // }
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

    return (
        <div>
            {User && user.email === User.email && !isLoading && (
                <div className='absolute flex items-center justify-center dark:text-white bottom-14 sm:bottom-0 top-14 w-full'>
                    {console.log('userrrrrr: ', user, User )}
                    {/* <img src={url} ref={img} width='500' height='500' /> */}
                    <form method='POST' action='/api/post/' onSubmit={async (e) => {
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

                                    fetch('/api/post/', {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            img: data.secure_url,
                                            content: content.current.value,
                                            user: id,
                                            comments: [],
                                            createdAt: currentDate,
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
                        <input className='file:rounded-lg file:border-0 file:outline-0 file:bg-zinc-300 dark:file:bg-zinc-600 dark:file:text-white file:p-1 file:px-4 file:text-lg file:mr-5 file:cursor-pointer transition file:duration-300 file:hover:bg-zinc-400 dark:file:hover:bg-zinc-500 ' type="file" name="file" id="file" />
                        <textarea ref={content} name="" id="" className='text-lg resize-y h-40 w-full mt-5 bg-transparent p-3 outline-none rounded-lg' placeholder='Scrivi qui ciò che pensi...'></textarea>
                        <input className={`${success ? 'bg-green-500' : ''} mt-10 mb-5 text-lg font-semibold p-2 px-7 rounded-lg drop-shadow-lg cursor-pointer bg-zinc-300 dark:bg-zinc-600 transition duration-300 hover:bg-zinc-400 dark:hover:bg-zinc-500 hover:-translate-y-2 hover:scale-110`} type="submit" value={
                            success
                                ?
                                'Post Pubblicato'
                                :
                                error ? 'Errore nella pubblicazione' : 'Crea Post'
                        } />
                    </form>
                </div>
            )}
        </div>
    )
}



export default New
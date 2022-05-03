import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import base64 from 'base-64'
// import cloudinary from 'cloudinary'
import uploadcare from 'uploadcare-widget'
const cloudinary = require('cloudinary-core').Cloudinary.new()
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'

const New = () => {

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dcrsevgpq',
        },
    })

    const myImage = cld.image('docs/models') 

    console.log('my image: ',myImage);
    
    // const cloudinary = require('cloudinary').v2
    const [url, setUrl] = useState('')
    const [files, setFiles] = useState(null)
    const img = useRef(null)
    const content = useRef(null)
    const [image, setImage] = useState('')
    const router = useRouter()
    const [success, setSuccess] = useState(true)
    const [loading, setLoading] = useState(false)
    const { query: { id } } = router
    // console.log(router);

    const UPLOADCARE_LOCALE = 'it'
    const UPLOADCARE_LOCALE_TRANSLATIONS = {
        buttons: {
            choose: {
            files: {
                one: 'Scegli un file',
            },
            },
        },
    }

    if (typeof window !== 'undefined') { 
        var file = uploadcare.fileFrom('url', 'http://example.com/image.png')

        console.log(file);
    }


    return (
        <div>
                
            <div className='absolute flex items-center justify-center dark:text-white bottom-14 sm:bottom-0 top-14 w-full'>
                {/* <img src={url} ref={img} width='500' height='500' /> */}
                <form method='POST' action='/api/post/' onSubmit={(e) => {
                    e.preventDefault()
                    // console.log(e);

                    // const formData = new FormData()
                    // formData.append('image', files)
                    // formData.append('content', content.current.value)

                    // console.log(formData);
                    if (!loading) {

                        console.log({
                            img: image,
                            content: content.current.value,
                            user: id,
                            comments: [],
                        })
                        console.log('image: ', image);
                        fetch('/api/post/', {
                            method: 'POST',
                            body: JSON.stringify({
                                img: image,
                                content: content.current.value,
                                user: id,
                                comments: [],
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
                                }, 1000)
                                setTimeout(() => { 
                                    router.push('/')
                                }, 2000)
                            }
                        })
                    }


                }} className='drop-shadow-lg w-10/12 sm:w-4/12 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex flex-col items-center gap-y-2'>
                    <h1 className='text-3xl font-semibold mb-4 mt-2'>Crea un nuovo post</h1>
                    <input
                        type="hidden"
                        role="uploadcare-uploader"
                        data-public-key="50a290e85f3101ba9ed1"
                        data-tabs="file camera url facebook gdrive gphotos"
                        onChange={(e) => { 














                            if (typeof window !== 'undefined') { 
                            var file = uploadcare.fileFrom('object', e.target.files[0]);

                                // console.log(file);
                                
                            file.progress(function (uploadInfo) {
                                // console.log('progress: ', uploadInfo);
                                // State of your upload gets updated.
                                // The callback is invoked at least once with a current state,
                                // right after assignment.
                            })

                            file.done(function(fileInfo) {
                            // Upload has successfully completed and a file is ready.
                                // console.log('success');
                                // console.log(fileInfo);
                            }).fail(function (error, fileInfo) {
                                // console.log('failed...');
                                
                                // console.log(fileInfo);
                                // console.log(error);
                            // Upload failed, or something else went wrong, a file is not ready.
                            });
                        }
                        }}
                    />
                    <input onChange={async (e) => {
                        console.log(e.target.files[0]);
                        // console.log(JSON.parse(e.target.files[0]))

                        const currFile = e.target.files[0]
                        // const fd = new FormData()
                        // fd.append('image', currFile)
                        
                        // console.log(fd.get('image'));


                        // const uploadData = await fetch('/api/upload')

                        // console.log('uploadData: ', uploadData);

                        fetch('/api/upload/', {
                            method: 'POST',
                            body: JSON.stringify({
                                name: currFile.name,
                                size: currFile.size,
                                type: currFile.type,
                            }),
                            headers: {
                                'content-type': 'application/json',
                            },
                        }).then(res => res.json()).then(data => {
                            console.log('data: ', data);
                        })












                        if (typeof window !== 'undefined') { 
                            var file = uploadcare.fileFrom('object', e.target.files[0]);

                            console.log(file);

                            file.progress(function (uploadInfo) {
                                console.log('progress: ', uploadInfo)
                               // State of your upload gets updated.
                               // The callback is invoked at least once with a current state,
                               // right after assignment.
                            })

                            file.done(function(fileInfo) {
                            // Upload has successfully completed and a file is ready.
                                console.log('success');
                                console.log(fileInfo);
                            }).fail(function (error, fileInfo) {
                                console.log('failed...');
                                
                                console.log(fileInfo);
                                console.log(error);
                            // Upload failed, or something else went wrong, a file is not ready.
                            });
                        }
                            
                        
                        // const File = await cloudinary.upload(e.target.files[0])
                        // console.log('cloudinary: ', File);
                        cloudinary.config(
                            'cloud_name', 'dzq0qjvxg'
                        )

                        cloudinary.init()
                        const url = cloudinary.url('example.png')
                        // console.log(cloudinary);
                        // console.log(url);
                        
                        // const files = e.target.files
                        // const data = new FormData()

                        // data.append('file', files[0])
                        // data.append('upload_preset', 'socell')
                        // // data.append('api_key', '611918792535995')

                        // // console.log(data.getAll('upload_preset'));



                        // setLoading(true)


                        // console.log(files);
    
                        // const res = await fetch('https://api.cloudinary.com/v1_1/dcrsevgpq/image/upload', {
                        //     method: 'POST',
                        //     // headers: {
                        //     //     'Authorization': 'Basic ' + base64.encode(process.env.CLOUDINARY_URL),
                        //     // },
                        //     body: data,
                        // })

                        // const file = await res.json()
                        // console.log(file);

                        // console.log(file.secure_url)

                        // setImage(file.secure_url)
                        // setLoading(false)

                    }} className='file:rounded-lg file:border-0 file:outline-0 file:bg-zinc-300 dark:file:bg-zinc-600 dark:file:text-white file:p-1 file:px-4 file:text-lg file:mr-5 file:cursor-pointer transition file:duration-300 file:hover:bg-zinc-400 dark:file:hover:bg-zinc-500 ' type="file" name="file" id="file" />
                    <textarea ref={content} name="" id="" className='text-lg resize-y h-40 w-full mt-5 bg-transparent p-3 outline-none rounded-lg' placeholder='Scrivi qui ciò che pensi...'></textarea>
                    <input className={`${success ? 'bg-green-500' : ''} mt-10 mb-5 text-lg font-semibold p-2 px-7 rounded-lg drop-shadow-lg cursor-pointer bg-zinc-300 dark:bg-zinc-600 transition duration-300 hover:bg-zinc-400 dark:hover:bg-zinc-500 hover:-translate-y-2 hover:scale-110`} type="submit" value="Crea post" />
                </form>
            </div>
        </div>
    )
}

export default New
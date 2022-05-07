import React, { useState, useEffect, useRef } from 'react'
import logo from '../images/logo.png'
import icon from '../images/icon.png'
import Image from 'next/image'

const LoadingScreen = ({ isLoading }) => {

    const [percentage, setPercentage] = useState(0)
    const [isDone, setIsDone] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const loader = useRef(null)
    const [loading, setIsLoading] = useState(isLoading)
    // const [text, setText] = useState('')
    const text = useRef(null)

    useEffect(() => {
    
        if (loading) {
            for (let i = 0; i <= 100; i++) {
                setTimeout(() => {
                    setPercentage(i)
                    loader.current.style.width = `${i}%`


                    if (i === 100) {
                        setTimeout(() => {
                            setIsDone(true)
                            loader.current.style.background = '#0db60d'
                            text.current.innerText = 'Caricamento terminato'
                            setTimeout(() => {
                                setIsLoading(false)
                            }, 500)
                        }, 500)
                    }

                }, i * 100)
            }
        }

    
    }, [])
    

    return (
        <div>
            {loading && (
                <div>
                    <div className='loading-screen z-[70] bg-white fixed inset-0 flex flex-col items-center justify-center dark:text-white'>
                        <div className='w-7/12 h-14 sm:h-44 relative'>
                            <Image src={logo} alt="" layout='fill' draggable='false' />
                        </div>
                        <div className='relative w-7/12 h-10 border-4 border-zinc-900 dark:border-gray-100 rounded-lg mt-10'>
                            <div ref={loader} className={`absolute h-full dark:bg-white bg-black`}></div>
                        </div>
                        <div ref={text} className='mt-5 text-3xl font-bold'>
                            Caricamento: {percentage}%
                        </div>
                    <div className='absolute flex flex-col items-center -translate-x-1/2 left-1/2 bottom-10 w-full'>
                        <div className=''>
                            <Image src={icon} width={'50'} height={'50'} draggable='false' />
                        </div>
                            <div className='mt-5 flex items-center dark:text-white text-xl'>
                                by
                                <p className='font-semibold ml-2'>
                                    sasa-gamer47
                                </p>
                        </div>
                    </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LoadingScreen
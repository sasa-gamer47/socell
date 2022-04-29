import React, { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import { Menu } from '@headlessui/react'
import Link from 'next/link'
import { ThemeToggle, ThemeSelector } from './'
// import dbConnect from '../utils/dbCoùznnect'
// import User from '../models/User'

const Navbar = () => {

    const [isMobile, setIsMobile] = useState(null)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth <= 768)
            window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth <= 768)
            })
        }
    }, [])

    
    const { user, isLoading } = useUser()
    // const [mongoUser, setMongoUser] = useState(null)
    // console.log(user);
    
    // useEffect(() => {
    //     dbConnect()
    //     async function getMongoDBUser() {
    //         console.log(User);
    //         const res = await User.findOne({ email: user.email })
    //         const data = await res.json()

    //         console.log(data);
    //         setMongoUser(data)
    //     }

    //     if (user) {
    //         getMongoDBUser()
    //     }
    // }, [user])

    return (
        <>
            {isLoading && (
                <div>Loading...</div>
            )}
            {!isLoading && (
                <nav className={`fixed top-0 w-full h-14 items-center justify-center dark:bg-gray-900 dark:text-white bg-gray-100 drop-shadow-lg grid ${isMobile ? 'mobile-navbar' : 'navbar'}`}>
                    <div>
                        [logo]
                    </div>
                    <div className='flex items-center px-3'>
                        <ThemeToggle />
                        {/* <ThemeSelector /> */}
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='overflow-hidden h-12 w-12 rounded-full'>
                            {user && (
                                <>
                                    <Menu>
                                        <Menu.Button>
                                            <Image draggable='false' src={user.picture} width='48' height='48' fill='responsive' />
                                        </Menu.Button>
                                        <div className='absolute right-1 sm:right-8 text-center'>
                                            <Menu.Items>
                                                <Menu.Item as='div' className='transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-gray-900 py-2 px-4'><Link href={`/api/user/`}>Profilo</Link></Menu.Item>
                                                <Menu.Item as='div' className='transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-gray-900 py-2 px-4'>Impostazioni</Menu.Item>
                                                <Menu.Item as='div' className='transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-gray-900 py-2 px-4'>
                                                    <a href='/api/auth/logout'>Log out</a>
                                                </Menu.Item>
                                            </Menu.Items>    
                                        </div>
                                    </Menu>
                                </>
                            )}
                        </div>
                        {!user && (
                            <a href="/api/auth/login">Log in</a>
                        )}
                    </div>
                </nav>
            )}
        </>
    )
}

export default Navbar
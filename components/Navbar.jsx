import React, { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import { Menu } from '@headlessui/react'
import Link from 'next/link'
import { ThemeToggle } from './'
import { getUser } from '../utils'
import icon from '../images/logo.png'


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
    const [mongoDBUser, setMongoDBUser] = useState(null)
    
    if (user && !mongoDBUser) {
        getUser(setMongoDBUser)
    }

    return (
        <>
            {isLoading && (
                <div>Loading...</div>
            )}
            {!isLoading && mongoDBUser && (
                <nav className={`fixed top-0 z-50 w-full h-14 items-center justify-center dark:bg-zinc-800 dark:text-white bg-gray-100 drop-shadow-lg grid ${isMobile ? 'mobile-navbar' : 'navbar'}`}>
                    <div className='ml-2 sm:ml-10 hover:cursor-pointer'>
                        <Link href={'/'}>
                            <Image fill="responsive" src={icon} />
                        </Link>
                    </div>
                    <div className='flex items-center px-3'>
                        <ThemeToggle />
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
                                                <Menu.Item as='div' className='transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-zinc-800 py-2 px-4'><Link href={`/api/user/${mongoDBUser._id}`}>Profilo</Link></Menu.Item>
                                                <Menu.Item as='div' className='transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-zinc-800 py-2 px-4'>Impostazioni</Menu.Item>
                                                <Menu.Item as='div' className='transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-zinc-800 py-2 px-4'>
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
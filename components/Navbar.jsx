import React, { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import { Menu } from '@headlessui/react'
import Link from 'next/link'
import { ThemeToggle } from './'
import { getUser } from '../utils'
import icon from '../images/logo.png'
import { BsPlusSquare, BsFillPlusSquareFill } from 'react-icons/bs'
import { RiSearchLine, RiSearchFill } from 'react-icons/ri'
import { TiHomeOutline, TiHome } from 'react-icons/ti'
import { MdOutlineNotificationsNone, MdNotifications } from 'react-icons/md'
import { useRouter } from 'next/router'


const Navbar = () => {

    const router = useRouter()
    const { pathname, query } = router
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
        getUser(user, setMongoDBUser)
    }

    return (
        <>
            {isLoading && (
                <div>Loading...</div>
            )}
            {!isLoading && (
                <nav className={`fixed top-0 z-40 w-full h-14 items-center justify-center dark:bg-zinc-800 dark:text-white bg-gray-100 drop-shadow-lg grid ${isMobile ? 'mobile-navbar' : 'navbar'}`}>
                    <div className='ml-2 sm:ml-10 hover:cursor-pointer'>
                        <Link href={'/'} >
                            <div>
                                <Image fill="responsive" src={icon} />
                            </div>
                        </Link>
                    </div>
                    {!isMobile && (
                        <Link href={'/'}>
                            <div className='flex items-center justify-center text-3xl cursor-pointer transition duration-300 hover:text-slate-900 hover:text-zinc-700 dark:text-white dark:hover:text-slate-400'>
                                {pathname === '/' ? <TiHome /> : <TiHomeOutline />}
                            </div>
                        </Link>
                    )}
                    {!isMobile && (
                        <div className='flex items-center justify-center text-3xl cursor-pointer transition duration-300 hover:text-slate-900 hover:text-zinc-700 dark:text-white dark:hover:text-slate-400'>
                            <RiSearchLine />
                        </div>
                    )}
                    {!isMobile && mongoDBUser && (
                        <Link href={`/${mongoDBUser._id}/new`}>
                            <div className='flex items-center justify-center text-3xl cursor-pointer transition duration-300 hover:scale-110 hover:text-slate-900 hover:text-zinc-700 dark:text-white dark:hover:text-slate-400'>
                                {pathname === `/[id]/new` ? <BsFillPlusSquareFill /> : <BsPlusSquare />}
                            </div>
                        </Link>
                    )}
                    {!isMobile && (
                        <div className='flex items-center justify-center text-3xl cursor-pointer transition duration-300 hover:text-slate-900 hover:text-zinc-700 dark:text-white dark:hover:text-slate-400'>
                            <MdOutlineNotificationsNone />
                        </div>
                    )}
                    {!isMobile && <div></div>}
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
                                                <Menu.Item as='div' className='transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-zinc-800 py-2 px-4'>
                                                    <>
                                                        {mongoDBUser && (
                                                            <Link href={`/api/user/${mongoDBUser._id}`}><p>Profilo</p></Link>
                                                        )}
                                                        {!mongoDBUser && (<p>Profilo</p>)}
                                                    </>
                                                </Menu.Item>
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
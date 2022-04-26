import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import { Menu } from '@headlessui/react'

const Navbar = () => {

    const { user, isLoading } = useUser()

    console.log(user);

    return (
        <>
            {isLoading && (
                <div>Loading...</div>
            )}
            {!isLoading && (
                <nav className='fixed top-0 w-full h-14 items-center justify-center dark:bg-gray-900 dark:text-white bg-yellow-300 drop-shadow-lg grid navbar mobile-navbar'>
                    <div>
                        [logo]
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='overflow-hidden h-12 w-12 rounded-full'>
                            {user && (
                                <>
                                    <Menu>
                                        <Menu.Button>
                                            <Image draggable='false' src={user.picture} width='48' height='48' fill='responsive' />
                                        </Menu.Button>
                                        <div className='absolute right-1 sm:right-24 text-center'>
                                            <Menu.Items>
                                                <Menu.Item as='div' className='transition duration-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-900 py-2 px-4'>Profilo</Menu.Item>
                                                <Menu.Item as='div' className='transition duration-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-900 py-2 px-4'>Impostazioni</Menu.Item>
                                                <Menu.Item as='div' className='transition duration-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-900 py-2 px-4'>
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
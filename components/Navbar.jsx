import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'


const Navbar = () => {

    const { user, isLoading } = useUser()

    console.log(user);

    return (
        <>
            {isLoading && (
                <div>Loading...</div>
            )}
            {!isLoading && (
                <nav className='fixed w-full h-14 dark:bg-gray-900 dark:text-white bg-yellow-300 drop-shadow-lg grid '>
                    [logo]
                </nav>
            )}
        </>
    )
}

export default Navbar
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'


const Navbar = () => {

    const { user, isLoading } = useUser()

    return (
        <>
            {isLoading && (
                <div>Loading...</div>
            )}
            {!isLoading && (
                <div className='fixed w-full h-20 bg-yellow-300 drop-shadow-lg'>
                    Navbar
                </div>
            )}
        </>
    )
}

export default Navbar
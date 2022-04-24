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
                <div>
                    Navbar
                </div>
            )}
        </>
    )
}

export default Navbar
import React, { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { TiHomeOutline } from 'react-icons/ti'

const DownNavbar = () => {

    const { user, isLoading } = useUser()
    const [isMobile, setIsMobile] = useState(null)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth <= 768)
            window.addEventListener('resize', () => {
                setIsMobile(window.innerWidth <= 768)
            })
        }
    }, [])


    return (
      <>
        {!isLoading && isMobile && (
          <nav className="fixed bottom-0 grid h-20 w-full grid-cols-5 items-center justify-center bg-yellow-300 drop-shadow-lg ">
            <div>
              [Home]
              <TiHomeOutline />
            </div>
            <div>[Explore]</div>
            <div>[Create new]</div>
            <div>[Other]</div>
            <div>[Other]</div>
          </nav>
        )}
      </>
    )
}

export default DownNavbar
import React, { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { TiHomeOutline, TiHome } from 'react-icons/ti'
import { MdOutlineExplore, MdExplore } from 'react-icons/md'
import { AiOutlinePlusCircle } from 'react-icons/ai'

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
          <nav className="dark:bg-gray-900 dark:text-white fixed bottom-0 grid h-14 w-full grid-cols-5 items-center justify-center bg-yellow-300 drop-shadow-lg">
            <div className='cursor-pointer text-2xl flex items-center justify-center transition duration-300 hover:text-slate-900 dark:text-white dark:hover:text-slate-400'>
              <TiHomeOutline />
            </div>
            <div className='cursor-pointer text-2xl flex items-center justify-center transition duration-300 hover:text-slate-900 dark:text-white dark:hover:text-slate-400'>
              <MdOutlineExplore />
            </div>
            <div className='cursor-pointer text-4xl flex items-center justify-center transition duration-300 hover:text-slate-900 dark:text-white dark:hover:text-slate-400 hover:scale-110 hover:-translate-y-1'>
              <AiOutlinePlusCircle />
            </div>
            <div>[Other]</div>
            <div>[Other]</div>
          </nav>
        )}
      </>
    )
}

export default DownNavbar
import React, { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { TiHomeOutline, TiHome } from 'react-icons/ti'
import { MdOutlineExplore, MdExplore, MdOutlineNotificationsNone, MdNotifications } from 'react-icons/md'
import { AiOutlinePlusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { RiSearchLine, RiSearchFill } from 'react-icons/ri'
// import { IoNotificationsOutline } from 'react-icons/io'

import Link from 'next/link'
import { getUser } from '../utils'
import { useRouter } from 'next/router'

const DownNavbar = () => {

    const { user, isLoading } = useUser()
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

    const [mongoDBUser, setMongoDBUser] = useState(null)

    if (user && !mongoDBUser) {
      getUser(user, setMongoDBUser)
    }


    return (
      <>
        {!isLoading && mongoDBUser && isMobile && (
          <nav className="down-navbar fixed bottom-0 z-40 grid h-14 w-full grid-cols-5 items-center justify-center bg-gray-100 dark:bg-zinc-800 dark:text-white">
            {/* {console.log(`/${mongoDBUser._id}/new`)} */}
            <Link href={'/'}>
              <div className="flex cursor-pointer items-center justify-center text-2xl transition duration-300 hover:text-slate-900 hover:text-zinc-700 dark:text-white dark:hover:text-slate-400">
                {pathname === '/' ? <TiHome /> : <TiHomeOutline />}
              </div>
            </Link>
            <div onClick={() => router.push({ pathname: '/', query: { showSearchBar: true } })} className="flex cursor-pointer items-center justify-center text-2xl transition duration-300 hover:text-slate-900 hover:text-zinc-700 dark:text-white dark:hover:text-slate-400">
              {/* <MdOutlineExplore /> */}
              <RiSearchLine />
            </div>
            <Link href={`/${mongoDBUser._id}/new`}>
              <div className="flex cursor-pointer items-center justify-center text-4xl transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-slate-900 hover:text-zinc-700 dark:text-white dark:hover:text-slate-400">
                {pathname === `/[id]/new` ? <AiFillPlusCircle /> : <AiOutlinePlusCircle />}
              </div>
            </Link>
            <div className="flex cursor-pointer items-center justify-center text-2xl transition duration-300 hover:text-slate-900 hover:text-zinc-700 dark:text-white dark:hover:text-slate-400">
              <MdOutlineNotificationsNone />
            </div>
            <div>[Other]</div>
          </nav>
        )}
      </>
    )
}

export default DownNavbar
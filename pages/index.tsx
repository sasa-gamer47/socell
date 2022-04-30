import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { Navbar, DownNavbar, Post } from '../components/'
import { useState, useEffect } from 'react'
import dbConnect from '../utils/dbConnect'
import User from '../models/User'
import { Menu } from '@headlessui/react'
import Image from 'next/image'
import testImg from '../images/testImg.jpg'
import testImg2 from '../images/testImg2.jpg'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { AiOutlineLike, AiOutlineHeart, AiOutlineShareAlt  } from 'react-icons/ai'


const Home: NextPage = () => {


  const { user, isLoading } = useUser()
  

  return (
    <div className="min-h-screen">
      <Head>
        <title>Socell | Home</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar />
      <DownNavbar />
      <div className='container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 absolute z-10 overflow-y-scroll my-14 dark:text-white'>
        {user && !isLoading && (
          <>
              <Post post={null} />
              <Post post={null} />
              <Post post={null} />
              <Post post={null} />
              <Post post={null} />
          </>
        )}
      </div>
    </div>
  )
}

export default Home


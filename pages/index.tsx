import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { Navbar, DownNavbar } from '../components/'
import { useState, useEffect } from 'react'
import dbConnect from '../utils/dbConnect'
import User from '../models/User'
import { Menu } from '@headlessui/react'
import Image from 'next/image'
import testImg from '../images/testImg.jpg'
import testImg2 from '../images/testImg2.jpg'
import { BiDotsVerticalRounded } from 'react-icons/bi'


const Home: NextPage = () => {


  const { user, isLoading } = useUser()




  // useEffect(() => { 


  // console.log('user:' + mongoDBUser)

  // useEffect(() => { 
  //   console.log('hello')
  //   return async () => {

  //     dbConnect()

  //     if (user && !isLoading) {
  //       const userExists = await User.findOne({ email: user.email })
    
  //       if (!userExists) {
  //         try {
  //           const newUser: any = await User.create(user)
  //           // res.status(201).json({ success: true, data: user })
  //         } catch (error) {
  //           console.log(error)
  //           // res.status(400).json({ error: error.message })
  //         }
  //       }
  //     }
  //   }
  // }, [])

  

  return (
    <div className="min-h-screen">
      <Head>
        <title>Socell | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <DownNavbar />
      <div className='container absolute z-10 overflow-y-scroll my-14 dark:text-white'>
        {user && !isLoading && (
          <>
            {/* <div className='w-full p-1 bg-gray-500'>
              <div className='py-2 bg-gray-300 flex items-center'>
                <div className='rounded-full overflow-hidden h-50'>
                  <Image src={user.picture} width={'50'} height={'50'} fill='responsive' />
                </div>
                <div className='flex items-center w-full h-full justify-between px-4'>
                  <h1 className='ml-2 text-xl font-bold'>{user.name}</h1>
                  <div>
                    <BiDotsVerticalRounded />
                  </div>
                </div>
              </div>
              <hr />
              <div className='w-full bg-red-400'>
                <Image src={testImg} fill='responsive' />
              </div>
              <p className='text-lg'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel ab voluptatibus beatae. Ad, ex cupiditate explicabo sapiente optio fugit et rerum ratione quidem dolorum amet illum, recusandae aspernatur corporis hic!
              </p>
              <div className='flex items-center'>
                <p>Like</p>
                <p>Heart</p>
                <p>Share</p>
              </div>
              <p>commenti</p>
            </div> */}
          </>
        )}
      </div>
    </div>
  )
}

export default Home


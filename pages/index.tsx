import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { Navbar, DownNavbar } from '../components/'
import { useEffect } from 'react'
import dbConnect from '../utils/dbConnect'
import User from '../models/User'


const Home: NextPage = () => {


  const { user, isLoading } = useUser()

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
      {/* <img src={user?.picture}  /> */}
      {/* <h1>Hello {user?.name || 'undefined'}, Socell says to you!</h1> */}
    </div>
  )
}

export default Home


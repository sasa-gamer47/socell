import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { Navbar, DownNavbar } from '../components/'

const Home: NextPage = () => {

  const { user, isLoading } = useUser()

  

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


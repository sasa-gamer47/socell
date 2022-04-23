import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Socell | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello, Socell says to you!</h1>
    </div>
  )
}

export default Home


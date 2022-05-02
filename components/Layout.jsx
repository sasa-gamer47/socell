import React from 'react'
import Head from 'next/head'
import { Navbar, DownNavbar} from './'

const Layout = ({ children }) => {

    return (
        <>
            <Head>
                <title>Socell | Home</title>
                <link rel="icon" href="/logo.png" />
            </Head>
            <Navbar />
            <DownNavbar />
            <main>{children}</main>
        </>
    )
}

export default Layout
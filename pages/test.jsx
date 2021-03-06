import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'

const test = () => {

    const { user, isLoading } = useUser()

    // const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

    // console.log(user, isAuthenticated, isLoading)

    // const { data, error } = useSWR(
    // isLoading || !isAuthenticated ? null : '/api/my/shows',
    // async (url) => {
    //     const accessToken = await getAccessTokenSilently({
    //         audience: 'https://api/tv-shows',
    //         scope: 'read:shows',
    //     })
    //     const res = await fetch(url, {
    //     headers: {
    //         authorization: `Bearer ${accessToken}`,
    //     },
    //     })
    //     return res.json()
    // }
    // )

    // const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout, } = useAuth0()

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }
    // if (error) {
    //     return <div>Oops... {error.message}</div>
    // }
    // if (isAuthenticated) {
    //     return (
    //     <div>
    //         Hello {user.name}{' '}
    //         <button onClick={() => logout({ returnTo: window.location.origin })}>
    //             Log out
    //         </button>
    //     </div>
    //     )
    // } else {
    // return <button onClick={loginWithRedirect}>Log in</button>
        return (
            <>
                {/* <a href="/api/login">Log in</a>
                <a href="/api/logout">Log out</a> */}
                <a href="/api/auth/login">Log in</a>
                <a href="/api/auth/logout">Log out</a>

                {user && (<p>{user.name} welcome!!!</p>)}
                {!user && (<p>You are not logged in</p>)}
            </>
        )
    // }


    // return (
    //     <div>
    //         test
    //     </div>
    // )
}

export default test

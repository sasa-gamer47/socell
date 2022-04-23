import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import useSWR from 'swr'

const test = () => {

    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()


    return (
        <div>
            test
        </div>
    )
}

export default test
import React, { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

const completeLogin = () => {

    const router = useRouter()
    const { user, isLoading } = useUser()
    const [mongoDBUser, setMongoDBUser] =  useState()
    const { pathname, query } = router

    async function getUser() {
        const res = await fetch(`/api/user/${query.id}`)
        const data = (await res).json()

        setMongoDBUser(data.data)
    }


    return (
        <div>
            
        </div>
    )
}

export default completeLogin
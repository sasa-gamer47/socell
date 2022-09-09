import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

const completeLogin = () => {

    const router = useRouter()
    const { user, isLoading } = useUser()
    const { pathname, query } = router
    return (
        <div>
            
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/user/${context.params.id}`)
    const user = await res.json()

    return {
        props: {
        id: context.params.id,
        u: user,
        },
    }
}

export default completeLogin
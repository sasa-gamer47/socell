export function isMobileDevice() {
    if (window !== "undefined") {
        window.addEventListener('resize', () => {
            console.log(window.innerWidth <= 768)
            return window.innerWidth <= 768;
        })

        return window.innerWidth <= 768;
    }
}

export async function getUser(setMongoDBUser) {
    const res = await fetch('/api/user')
    const users = await res.json()

    users.data.forEach((user) => {
        const { email } = user

        if (user.email === email) {
        // console.log(user)
        setMongoDBUser(user)
        }
    })
}
export function isMobileDevice() {
    if (window !== "undefined") {
        window.addEventListener('resize', () => {
            console.log(window.innerWidth <= 768)
            return window.innerWidth <= 768;
        })

        return window.innerWidth <= 768;
    }
}

export async function getUser(User, setMongoDBUser) {
    const res = await fetch('/api/user')
    const users = await res.json()

    users.data.forEach((user) => {
        const { email } = user

        if (User.email === email) {
            // console.log(email);
        // console.log(user)
        setMongoDBUser(user)
        }
    })
}

export async function getUserById(id, setUser) {
    const res = await fetch(`/api/user/${id}`)
    const user = await res.json()

    setUser(user)
}

export function getUserImgColor(nickname) {
    console.log('nickname: ' + nickname)
    const charCodeRed = nickname.charCodeAt(0)
    const charCodeGreen = nickname.charCodeAt(1)
    const firstChar = nickname.charAt(0)
    const secondChar = nickname.charAt(1)

    const red = Math.pow(charCodeRed, 7) % 200
    const green = Math.pow(charCodeGreen, 7) % 200
    const blue = (red + green) % 200

    return { red, green, blue, firstChar, secondChar }
}
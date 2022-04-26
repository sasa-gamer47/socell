export function isMobileDevice() {
    if (window !== "undefined") {
        window.addEventListener('resize', () => {
            console.log(window.innerWidth <= 768)
            return window.innerWidth <= 768;
        })

        return window.innerWidth <= 768;
    }
}
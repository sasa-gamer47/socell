import React, { useState, useEffect } from 'react'

const ThemeToggle = () => {
  function useDarkMode() {
      const [theme, setTheme] = useState(
          typeof window !== "undefined" ? localStorage.theme : "dark"
      );
      const colorTheme = theme === "dark" ? "light" : "dark";

      useEffect(() => {
          const root = window.document.documentElement;

          root.classList.remove(colorTheme);
          root.classList.add(theme);

          if (typeof window !== "undefined") {
          localStorage.setItem("theme", theme)
          }

      }, [theme]);

      return [colorTheme, setTheme];
  }

      const [colorTheme, setTheme] = useDarkMode()

  return (
    <div onClick={(() => colorTheme === 'dark' ? setTheme('dark') : setTheme('light'))} className={`relative h-5 w-full cursor-pointer rounded-lg transition duration-500 ${colorTheme === 'light' ? 'bg-zinc-600' : 'bg-gray-200'}`}>
      <div
        className={`absolute ${
          colorTheme === 'light' ? 'right-0 bg-gray-100' : 'left-0 bg-gray-800'
        } h-5 w-5 rounded-full transition duration-500`}
      ></div>
    </div>
  )
}

export default ThemeToggle

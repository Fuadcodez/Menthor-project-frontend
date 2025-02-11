import React from 'react'
import ThemeToggle from './ThemeToggle'
import ThemeSwitcher from './ThemeToggle';
import "../app/globals.css";
const Navbar = () => {
  return (
    <div className='flex items-center justify-between text-[hsl(200,15%,8%)] dark:text-[hsl(0,0%,100%)] dark:bg-[hsl(209,23%,22%)] px-4 py-6 sticky w-full top-0 z-50 left-0 bg-[hsl(0,0%,100%)]'>
        <h1 className='text-lg' >Where in the world?</h1>
        <div className='flex items-center gap-3'>
            <ThemeSwitcher/>
        </div>
    </div>
  )
}

export default Navbar
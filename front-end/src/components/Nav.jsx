import React from 'react'
import Logo from '../assets/logo.jpg'

const Nav = ({navigate}) => {
  const navi = (route) => {
    navigate(route)
  }

  return (
    <nav className="bg-blue-700 flex justify-between text-white">
        <img src={Logo} alt="logo" className="w-12 rounded-full my-1 ml-20"/>
        <ul className="flex items-center gap-2">
            <li onClick={() => navi('home')} className="cursor-pointer hover:underline">Home</li>
            <li onClick={() => navi('home')} className="cursor-pointer hover:underline">Student</li>
        </ul>
        <a onClick={() => navi('login')} className="no-underline my-auto mr-20 cursor-pointer hover:underline">Login</a>
    </nav>
  )
}

export default Nav
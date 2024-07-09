import React from 'react'
import Logo from '../assets/logo.jpg'

const Hero = () => {
  return (
    <div className="flex align-center justify-around my-20">
        <h1 className="text-blue-600 text-4xl max-w-[40%] text-center font-semibold italic leading-tight md:text-7xl">
            Welcome to <span className="font-bold">Megabyte College</span> Schedule Viewer
        </h1>
        <img src={Logo} alt="" className="w-[20%] rounded-full object-contain" />
    </div>
  )
}

export default Hero
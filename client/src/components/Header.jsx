import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Header = () => {

  const { userData } = useContext(AppContext)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center ">

      {/* Avatar */}
      <div className="relative group">
        <img
          src={assets.header_img}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 rounded-full bg-black/5 group-hover:bg-black/0 transition-all duration-300"></div>
      </div>

      {/* Greeting */}
      <h1 className="flex items-center gap-2 mt-6 text-2xl sm:text-4xl font-medium text-gray-700">
        Hey {userData ? userData.name : "Developer"}
        <img
          src={assets.hand_wave}
          alt="Wave"
          className="w-8 h-8 animate-bounce"
        />
      </h1>

      {/* Main Title */}
      <h2 className="mt-3 text-4xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
        Welcome to my app
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-xl text-gray-500 text-base sm:text-lg leading-relaxed">
        Let's start with a quick product tour and we will have you up and running in no time.
      </p>

      {/* Button */}
      <button className="mt-8 px-10 py-3 rounded-full  font-medium shadow-md  hover:shadow-lg active:scale-95 transition-all duration-200">
        Get Started
      </button>

    </div>
  )
}

export default Header
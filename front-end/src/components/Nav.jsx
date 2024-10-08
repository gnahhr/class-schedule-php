import { useState, useEffect } from 'react'
import Logo from '../assets/logo.jpg'

const Nav = ({navigate, isLoggedIn, logout}) => {
  const [ name, setName ] = useState(null)
  
  const navi = (route) => {
    navigate(route)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user)
    {
      setName(user.userName)
    }

  }, [])


  return (
    <nav className="bg-blue-700 flex justify-between text-white h-[10vh] max-h-[10vh]">
        <img src={Logo} alt="logo" className="w-12 h-12 rounded-full my-auto ml-20"/>
        {isLoggedIn ?
        <div className="my-auto mr-6">
          <p className="text-bold">Hello, {name}</p>
          <p className="underline hover:cursor-pointer" onClick={() => logout()}>Logout</p>
        </div>
        :
        <>
          <ul className="flex items-center gap-2">
              <li onClick={() => navi('home')} className="cursor-pointer hover:underline">Home</li>
              <li onClick={() => navi('student')} className="cursor-pointer hover:underline">Student</li>
          </ul>
          <a onClick={() => navi('login')} className="no-underline my-auto mr-20 cursor-pointer hover:underline">Login</a>
        </>
        }
    </nav>
  )
}

export default Nav
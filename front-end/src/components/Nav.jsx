import { useState, useEffect } from 'react'
import Logo from '../assets/logo.jpg'

const Nav = ({navigate, isLoggedIn}) => {
  const [ name, setName ] = useState(null)
  
  const navi = (route) => {
    navigate(route)
  }

  useEffect(() => {
    const { userName } = JSON.parse(localStorage.getItem('user'));

    setName(userName)
  }, [])


  return (
    <nav className="bg-blue-700 flex justify-between text-white h-[10vh] max-h-[10vh]">
        <img src={Logo} alt="logo" className="w-12 h-12 rounded-full my-auto ml-20"/>
        {isLoggedIn ?
        <>
          <p className="text-bold my-auto mr-6" >Hello, {name}</p>
        </>
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
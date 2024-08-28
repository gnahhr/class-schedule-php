import { useState, useEffect } from "react";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Student from "./components/Student";
import Login from "./components/Login";
import SideNav from "./components/SideNav";

import Admin from "./components/Admin";
import Department from "./components/Department";
import Teacher from "./components/Teacher";

import User from "./utils/user"

function App() {
  const [ active, setActive ] = useState('home');
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ error, setError ] = useState(null);

  const login = async (payload) =>
  {
    const response = await User.login(payload)

    if (response.statusCode != 200)
    {
      setError(response.message)

      return
    }

    setError(null);

    setIsLoggedIn(true);

    localStorage.setItem('user', JSON.stringify(response.response));
  }

  useEffect( () => 
  {
    let user = localStorage.getItem('user')

    if (user)
    {
      setIsLoggedIn(true)
    }

  }, [])

  return (
    <div className='min-h-screen flex flex-col'>
      <Nav navigate={setActive} isLoggedIn={isLoggedIn}></Nav>
      {isLoggedIn ?
      <div className='block md:flex'>
        <SideNav navigate={setActive}></SideNav>
        <div className="p-5 md:flex-grow">  
          {/* <Admin></Admin> */}
          {/* <Department></Department> */}
          <Teacher></Teacher>
        </div>
      </div>
      :
      <>
        <div className="sm:h-[72vh] sm:max-h-[72vh]">
          { active == 'home' && <Hero></Hero> }
          { active == 'student' && <Student></Student> }
          { active == 'login' && <Login fn={login} error={error}></Login> }
        </div>
        <Footer></Footer>
      </>
      }
    </div>
  )
}

export default App

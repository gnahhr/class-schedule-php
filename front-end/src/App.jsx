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
import Course from "./components/Course";
import Subject from "./components/Subject";
import Year from "./components/Year";
import Section from "./components/Section";
import Schedules from "./components/Schedules";

import User from "./utils/user"

const sideNavLinks = ['Dashboard', 'Admin', 'Teacher', 'Schedule', 'Subject', 'Department', 'Course', 'Section', 'Year'];

function App() {
  const [ active, setActive ] = useState('home');
  const [ sideActive, setSideActive ] = useState('dashboard');
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

  const login = async (payload) =>
  {
    setIsLoading(true);

    const response = await User.login(payload)

    if (response.statusCode != 200)
    {
      setError(response.message)

      setIsLoading(false);

      return
    }

    setError(null);

    setIsLoggedIn(true);

    localStorage.setItem('user', JSON.stringify(response.response));
  }

  const logout = () =>
  {
    localStorage.removeItem('user');

    window.location.reload();
  }

  useEffect( () => 
  {
    let user = localStorage.getItem('user')

    if (user)
    {
      setIsLoggedIn(true)
    }

  }, [])

  const pages =
  {
    'admin': <Admin></Admin>,
    'department': <Department></Department>,
    'teacher': <Teacher></Teacher>,
    'course': <Course></Course>,
    'subject': <Subject></Subject>,
    'year': <Year></Year>,
    'section': <Section></Section>,
    'schedule': <Schedules></Schedules>
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Nav navigate={setActive} isLoggedIn={isLoggedIn} logout={logout}></Nav>
      {isLoggedIn ?
      <div className='block md:flex'>
        <SideNav links={sideNavLinks} navigate={setSideActive}></SideNav>
        <div className="p-5 md:flex-grow">  
          { pages[sideActive] }
        </div>
      </div>
      :
      <>
        <div className="sm:h-[72vh] sm:max-h-[72vh]">
          { active == 'home' && <Hero></Hero> }
          { active == 'student' && <Student></Student> }
          { active == 'login' && <Login fn={login} error={error} isLoading={isLoading}></Login> }
        </div>
        <Footer></Footer>
      </>
      }
    </div>
  )
}

export default App

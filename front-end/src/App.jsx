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
import SelectTeacher from "./components/SelectTeacher";

const sideNavLinks = ['Dashboard', 'Admin', 'Teacher', 'Schedule', 'Subject', 'Department', 'Course', 'Section', 'Year'];

function App() {
  const TYPE_TEACHER = 0;
  const TYPE_ADMIN = 1;

  const [ active, setActive ] = useState('home');
  const [ sideActive, setSideActive ] = useState('dashboard');
  const [ isTeacher, setIsTeacher ] = useState(TYPE_ADMIN);
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

    if(response.response.roleId == TYPE_TEACHER)
    {
      setIsTeacher(TYPE_TEACHER);
    }

    localStorage.setItem('user', JSON.stringify(response.response));
  }

  const logout = () =>
  {
    localStorage.removeItem('user');

    window.location.reload();
  }

  useEffect( () => 
  {
    let user = JSON.parse(localStorage.getItem('user'))

    if (user)
    {
      
      if(user.roleId == TYPE_TEACHER){
        setIsTeacher(TYPE_TEACHER);
        setIsLoggedIn(true)
      }

      if(user.roleId != TYPE_TEACHER){
        setIsLoggedIn(true)
      }
      
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
    'schedule': <Schedules></Schedules>,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav navigate={setActive} isLoggedIn={isLoggedIn} logout={logout} />
  
      {isLoggedIn ? (
        isTeacher !== TYPE_TEACHER ? (
          <div className="block md:flex">
            <SideNav links={sideNavLinks} navigate={setSideActive} />
            <div className="p-5 md:flex-grow">
              {pages[sideActive]}
            </div>
          </div>
        ) : (
          <SelectTeacher />
        )
      ) : (
        <>
          <div className="sm:h-[72vh] sm:max-h-[72vh]">
            {active === "home" && <Hero />}
            {active === "student" && <Student />}
            {active === "login" && <Login fn={login} error={error} isLoading={isLoading} />}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App

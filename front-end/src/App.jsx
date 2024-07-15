import { useState } from "react";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Student from "./components/Student";

import Login from "./components/Login";

function App() {
  const [ active, setActive ] = useState('home');

  const changePage = (page) =>
  {
    setActive(page);

    // window.location.replace()
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Nav navigate={setActive}></Nav>
      <div className="h-[72vh] max-h-[72vh]">
        { active == 'home' && <Hero></Hero> }
        { active == 'student' && <Student></Student> }
        { active == 'login' && <Login></Login> }
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App

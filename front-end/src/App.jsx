import { useState } from "react";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Steps from "./components/Steps";
import Footer from "./components/Footer";

import Login from "./components/Login";

function App() {
  const [ active, setActive ] = useState('home');

  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <Nav navigate={setActive}></Nav>
      <div className="my-auto ">
        {
          active == 'home' && 
          <>
            <Hero></Hero>
            <Steps></Steps>
          </>
        }
        {
          active == 'login' && 
          <Login></Login>
        }
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App

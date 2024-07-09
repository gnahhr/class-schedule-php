import { useState } from 'react'

const Login = () => {
  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();



  return (
    <div className="rounded border-2 min-w-min max-w-[40%] mx-auto p-10">
        <h2 className="text-xl text-bold text-center">ADMIN LOGIN</h2>
        <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input type="text" className="rounded h-8" name="username" id="username" value={username}/>
        </div>
        <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input type="text" className="rounded h-8" name="password" id="password" value={password}/>
        </div>
        <a className="bg-blue-600 border-2 border-blue-600 mt-5 mb-3 d-block py-2 px-5 rounded block text-center text-white cursor-pointer hover:text-blue-600 hover:bg-white">Login</a>
    </div>
  )
}

export default Login
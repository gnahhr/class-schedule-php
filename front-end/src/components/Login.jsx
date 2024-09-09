import { useState } from 'react'

const Login = ({fn, error, isLoading}) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const inputs =
  {
    'username': setUsername,
    'password': setPassword
  }

  const setInput = (e) => 
  {
    e.preventDefault();

    const value = e.target.value;

    const name = e.target.name;

    inputs[name](value);
  }

  const login = () =>
  {
    const payload =
    {
      userName: username,
      password
    }

    fn(payload);
  }

  return (
    <div className="rounded border-2 min-w-min max-w-[40%] mx-auto mt-20 p-10">
        {error && <p className="text-red-500 text-center text-bold">{error}</p>}
        <h2 className="text-xl text-bold text-center">ADMIN LOGIN</h2>
        <label className="input flex items-center gap-2 my-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" name="username" id="username"  placeholder="Username" value={username} onChange={(e) => setInput(e)} disabled={isLoading} required/>
        </label>
        <label className="input flex items-center gap-2 my-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" className="grow" name="password" id="password"  placeholder='Password' value={password} onChange={(e) => setInput(e)} disabled={isLoading} required/>
        </label>
        <div className="bg-blue-600 border-2 border-blue-600 mt-5 mb-3 d-block py-2 px-5 rounded block text-center text-white cursor-pointer hover:text-blue-600 hover:bg-white" onClick={() => login()} disabled={isLoading}>Login</div>
    </div>
  )
}

export default Login
import { useState } from 'react'

const Login = ({fn, error}) => {
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
        <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input type="text" className="rounded h-8" name="username" id="username" value={username} onChange={(e) => setInput(e)}/>
        </div>
        <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input type="text" className="rounded h-8" name="password" id="password" value={password} onChange={(e) => setInput(e)}/>
        </div>
        <div className="bg-blue-600 border-2 border-blue-600 mt-5 mb-3 d-block py-2 px-5 rounded block text-center text-white cursor-pointer hover:text-blue-600 hover:bg-white" onClick={() => login()}>Login</div>
    </div>
  )
}

export default Login
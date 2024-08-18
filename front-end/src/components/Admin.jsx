import { useState } from 'react'

import User from '../utils/user'

const modalTypes = 
{
    0: 'Add',
    1: 'Update',
    2: 'View'
}

const Admin = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isLoading, setIsLoading ] = useState(false)
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

  const add = async () => {

    const payload =
    {
        userName: 'Testing',
        password: 'Testing123',
        name: 'Test',
        roleId: 0
    }

    setIsLoading(true)

    const response = await User.register(payload)

    if (response)
    {
        console.log(response)
    }

    setIsLoading(false)
  }

  const update = () => {
    console.log('update')
  }

  const openModal = (type) => 
  {
    setModalType(type)

    document.getElementById('user_modal').showModal()
  }

  return (
    <>
        <div>
            <div className="flex justify-between">
                <button className="btn bg-blue-500 hover:bg-blue-700 text-white" onClick={() => openModal(0)}>Add User</button>
                <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                    </svg>
                </label>
            </div>

            <div className="overflow-x-auto my-5">
                <table className="table border border-black rounded">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <dialog id="user_modal" className="modal">
            <div className="modal-box bg-white">
                {isLoading && <p>Loading....</p>}
                <h3 className="font-bold text-lg">{modalTypes[modalType]} Admin</h3>
                <p className="py-4">
                    <label className="input flex items-center gap-2 my-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input type="text" className="grow" name="username" id="username"  placeholder="Username" value={username} onChange={(e) => setInput(e)} disabled={isLoading}/>
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
                        <input type="password" className="grow" name="password" id="password"  placeholder='Password' value={password} onChange={(e) => setInput(e)} disabled={isLoading}/>
                    </label>
                </p>
                <div className="modal-action">
                    <button className="btn bg-green-500 hover:bg-green-700 text-white" onClick={() => add()} disabled={isLoading}>Add</button>
                    <form method="dialog">
                        <button className="btn bg-red-500 hover:bg-red-700 text-white" disabled={isLoading}>Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    </>
  )
}

export default Admin
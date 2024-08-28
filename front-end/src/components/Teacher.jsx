import { useState, useEffect } from 'react'

import Alert from './Alert'
import Dropdown from './Dropdown'

import User from '../utils/user'
import Restful from '../utils/restful'

const route = 'user'

const modalTypes = 
{
    0: 'Add',
    1: 'Update',
    2: 'Delete'
}

const Teacher = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ username, setUsername ] = useState('');
  const [ name, setName ] = useState('');
  const [ department, setDepartment ] = useState('');
  const [ departments, setDepartments ] = useState([]);
  const [ password, setPassword ] = useState('');
  const [ active, setActive ] = useState(null);
  const [ search, setSearch ] = useState('');

  // Alert States  
  const [ showAlert, setShowAlert ] = useState(false);
  const [ alertMsg, setAlertMsg ] = useState(null);
  const [ alertType, setAlertType ] = useState('success');

  const [ users, setUsers ] = useState([]);
  const [ filtered, setFiltered ] = useState([]);

  const inputs =
  {
    'username': setUsername,
    'password': setPassword,
    'name': setName,
    'department': setDepartment,
    'search': setSearch,
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
        userName: username,
        password,
        name,
        departmentId: department,
        roleId: 0
    }

    setIsLoading(true)

    await User.register(payload)
    .then((res) =>
    {
        setAlertMsg('Successfully added user');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); }, [1500])
    })
    .catch((res) =>
    {
        setAlertMsg('Failed to add user');
        setAlertType('error');
        setShowAlert(true);
        setIsLoading(false)
    });
  }

  const fetch = async (id) =>
  {
    const response = await Restful.find(route, id, {isAdmin: 0}).then((res) => res.data.response);

    setUsername(response.userName);
    setName(response.name);
    setDepartment(response.department);

    setActive(response);
  }

  const update = async () =>
  {
    setIsLoading(true)

    const payload =
    {
        userName: username,
        password,
        name,
        departmentId: department
    }

    setIsLoading(true)

    await Restful.update(route, active.id, payload)
    .then((res) =>
    {
        setAlertMsg('Successfully updated user');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); }, [1500])
    })
    .catch((res) =>
    {
        setAlertMsg('Failed to update user');
        setAlertType('error');
        setShowAlert(true);
        setIsLoading(false)
    });
  }

  const getAll = async () => {
    const response = await Restful.get(route, { isAdmin: 0 });

    setUsers(response)
    setFiltered(response)
  }

  const getDepartments = async () =>
  {
    const response = await Restful.get('department');

    console.log(response);
  }

  const openModal = async (type, id = null) => 
  {
    if(id) await fetch(id);

    setModalType(type);

    document.getElementById('user_modal').showModal()
  }

  const closeModal = () => 
  {
    document.getElementById('user_modal').close()
  } 

  const del = async () =>
  {
    setIsLoading(true)

    setIsLoading(true)

    await Restful.delete(route, active.id)
    .then((res) =>
    {
        setAlertMsg('Successfully deleted user');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); }, [1500])
    })
    .catch((res) =>
    {
        setAlertMsg('Failed to delete user');
        setAlertType('error');
        setShowAlert(true);
        setIsLoading(false)
    });
  }

  const reset = () =>
  {
    setUsername('');
    setPassword('');
    setAlertMsg('');
    setActive({});
    setShowAlert(false);
    closeModal();

    getAll();
  }

  const filter = ()  =>
  {
    if (search.length < 1)
    {
        setFiltered(users);

        return;
    }

    const searched = users.filter((item) => 
    {
        const lItem = item.userName.toLowerCase();
        const lSearch = search.toLowerCase();

        return lItem.includes(lSearch)
    })

    setFiltered(searched);
  }

  useEffect(() =>
  {
    getAll()
    getDepartments()
  }, [])

  useEffect(() =>
  {
    filter()
  }, [search])

  return (
    <>
        <div>
            <div className="flex justify-between">
                <button className="btn bg-blue-500 hover:bg-blue-700 text-white" onClick={() => openModal(0)}>Add Teacher</button>
                <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" name="search" id="search" placeholder="Search" onChange={(e) => setInput(e)}/>
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

            <div className="my-5">
                <table className="table rounded">
                    {/* head */}
                    <thead>
                    <tr>
                        <th className="w-[5%]"></th>
                        <th className="w-[20%] text-center">Username</th>
                        <th className="w-[25%] text-center">Name</th>
                        <th className="w-[35%] text-center">Department</th>
                        <th className="w-[15%]"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        filtered.map(item =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td className="text-center">{item.userName}</td>
                            <td className="text-center">{item.name}</td>
                            <td className="text-center">{item.department.name}</td>
                            <td>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn bg-blue-500 hover:bg-blue-700 border-none text-white m-1">Actions</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow">
                                        <li onClick={() => openModal(1, item.id)}><a>Update</a></li>
                                        <li onClick={() => openModal(2, item.id)}><a>Delete</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        )
                    }
                    {filtered.length === 0 && <tr><td colSpan={3} className='text-center'>No results found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>

        <dialog id="user_modal" className="modal">
            <div className="modal-box bg-white">
                <h3 className="font-bold text-lg">{modalTypes[modalType]} Teacher</h3>
                {modalType === 2 ?
                <p className="py-4">Delete the user [{active.userName}]?</p>
                :

                    <div className="py-4">
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
                    </div>
                }
                <Alert show={showAlert} type={alertType} message={alertMsg}></Alert>
                <div className="modal-action">
                        {modalType === 0 && <button className="btn bg-green-500 hover:bg-green-700 text-white" onClick={() => add()} disabled={isLoading}><span>Add</span></button>}
                        {modalType === 1 && <button className="btn bg-green-500 hover:bg-green-700 text-white" onClick={() => update()} disabled={isLoading}><span>Update</span></button>}
                        {modalType === 2 && <button className="btn bg-green-500 hover:bg-green-700 text-white" onClick={() => del()} disabled={isLoading}><span>Delete</span></button>}
                        <button className="btn bg-red-500 hover:bg-red-700 text-white" disabled={isLoading} onClick={() => reset()}>Cancel</button>
                </div>
            </div>
        </dialog>
    </>
  )
}

export default Teacher
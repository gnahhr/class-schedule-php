import { useState, useEffect } from 'react'

import Alert from './Alert'
import Dropdown from './Dropdown'

import Restful from '../utils/restful'

const route = 'year'

const modalTypes = 
{
    0: 'Add',
    1: 'Update',
    2: 'Delete'
}

const Year = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ sy, setSy ] = useState('');
  const [ semester, setSemester ] = useState('');
  const [ active, setActive ] = useState(null);
  const [ search, setSearch ] = useState('');

  // Alert States  
  const [ showAlert, setShowAlert ] = useState(false);
  const [ alertMsg, setAlertMsg ] = useState(null);
  const [ alertType, setAlertType ] = useState('success');

  const [ years, setYears ] = useState([]);
  const [ filtered, setFiltered ] = useState([]);

  const inputs =
  {
    'sy': setSy,
    'semester': setSemester,
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
        sy,
        semester
    }

    setIsLoading(true)

    await Restful.store(route, payload)
    .then((res) =>
    {
        setAlertMsg('Successfully added year');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); }, [1500])
    })
    .catch((res) =>
    {
        setAlertMsg('Failed to add year');
        setAlertType('error');
        setShowAlert(true);
        setIsLoading(false)
    });
  }

  const fetch = async (id) =>
  {
    const response = await Restful.find(route, id).then((res) => res.data.data);

    setSy(response.sy);
    setSemester(response.semester);

    setActive(response);
  }

  const update = async () =>
  {
    setIsLoading(true)

    const payload =
    {
        sy,
        semester,
    }

    setIsLoading(true)

    await Restful.update(route, active.id, payload)
    .then((res) =>
    {
        setAlertMsg('Successfully updated year');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); }, [1500])
    })
    .catch((res) =>
    {
        setAlertMsg('Failed to update year');
        setAlertType('error');
        setShowAlert(true);
        setIsLoading(false)
    });
  }

  const getAll = async () => {
    const response = await Restful.get(route);

    setYears(response)
    setFiltered(response)
  }

  const openModal = async (type, id = null) => 
  {
    if(id) await fetch(id);

    setModalType(type);

    document.getElementById('year_modal').showModal()
  }

  const closeModal = () => 
  {
    document.getElementById('year_modal').close()
  } 

  const del = async () =>
  {
    setIsLoading(true)

    setIsLoading(true)

    await Restful.delete(route, active.id)
    .then((res) =>
    {
        setAlertMsg('Successfully deleted year');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); }, [1500])
    })
    .catch((res) =>
    {
        setAlertMsg('Failed to delete year');
        setAlertType('error');
        setShowAlert(true);
        setIsLoading(false)
    });
  }

  const reset = () =>
  {
    setSy('');
    setSemester('');
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
        setFiltered(years);

        return;
    }

    const searched = years.filter((item) => 
    {
        const lItem = item.sy.toLowerCase();
        const lSearch = search.toLowerCase();

        return lItem.includes(lSearch)
    })

    setFiltered(searched);
  }

  useEffect(() =>
  {
    getAll()
  }, [])

  useEffect(() =>
  {
    filter()
  }, [search])

  return (
    <>
        <div>
            <div className="flex justify-between">
                <button className="btn bg-blue-500 hover:bg-blue-700 text-white" onClick={() => openModal(0)}>Add School Year</button>
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
                        <th className="w-[40%] text-center">School Year</th>
                        <th className="w-[45%] text-center">Semester</th>
                        <th className="w-[10%]"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        filtered.map(item =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td className="text-center">{item.sy}</td>
                            <td className="text-center">{item.semester}</td>
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

        <dialog id="year_modal" className="modal">
            <div className="modal-box bg-white">
                <h3 className="font-bold text-lg">{modalTypes[modalType]} Year</h3>
                {modalType === 2 ?
                  <p className="py-4">Delete the school year [{active.sy}]?</p>
                :
                  <div className="py-4">
                      <label className="input flex items-center gap-2 my-1">
                          <input type="text" className="grow" name="sy" id="sy"  placeholder="School Year" value={sy} onChange={(e) => setInput(e)} disabled={isLoading} required/>
                      </label>
                      <label className="input flex items-center gap-2 my-1">
                          <input type="number" className="grow" name="semester" id="semester"  placeholder="Semester" value={semester} onChange={(e) => setInput(e)} disabled={isLoading} required/>
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

export default Year
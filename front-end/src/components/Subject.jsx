import { useState, useEffect } from 'react'

import Alert from './Alert'
import Dropdown from './Dropdown'

import Restful from '../utils/restful'

const route = 'subject'

const modalTypes = 
{
    0: 'Add',
    1: 'Update',
    2: 'Delete'
}

const Subject = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ code, setCode ] = useState('');
  const [ units, setUnits ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ course, setCourse ] = useState('');
  const [ active, setActive ] = useState(null);
  const [ search, setSearch ] = useState('');

  // Alert States  
  const [ showAlert, setShowAlert ] = useState(false);
  const [ alertMsg, setAlertMsg ] = useState(null);
  const [ alertType, setAlertType ] = useState('success');

  const [ subjects, setSubjects ] = useState([]);
  const [ courses, setCourses ] = useState([]);
  const [ filtered, setFiltered ] = useState([]);

  const inputs =
  {
    'code': setCode,
    'units': setUnits,
    'description': setDescription,
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
        code,
        units,
        description,
        course_id: course,
    }

    setIsLoading(true)

    await Restful.store(route, payload)
    .then((res) =>
    {
        setAlertMsg('Successfully added subject');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); }, [1500])
    })
    .catch((res) =>
    {
        setAlertMsg('Failed to add subject');
        setAlertType('error');
        setShowAlert(true);
        setIsLoading(false)
    });
  }

  const fetch = async (id) =>
  {
    const response = await Restful.find(route, id).then((res) => res.data.data);

    setCode(response.code);
    setUnits(response.units);
    setDescription(response.description);
    setCourse(parseInt(response.course.id))

    setActive(response);
  }

  const update = async () =>
  {
    setIsLoading(true)

    const payload =
    {
        code,
        units,
        description,
        course_id: course,
    }

    setIsLoading(true)

    await Restful.update(route, active.id, payload)
    .then((res) =>
    {
        setAlertMsg('Successfully updated subject');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); }, [1500])
    })
    .catch((res) =>
    {
        setAlertMsg('Failed to update subject');
        setAlertType('error');
        setShowAlert(true);
        setIsLoading(false)
    });
  }

  const getAll = async () => {
    const response = await Restful.get(route);

    setSubjects(response)
    setFiltered(response)
  }

  const getCourses = async () => {
    const response = await Restful.get('course');

    setCourses(response)
  }

  const openModal = async (type, id = null) => 
  {
    if(id) await fetch(id);

    setModalType(type);

    document.getElementById('subject_modal').showModal()
  }

  const closeModal = () => 
  {
    document.getElementById('subject_modal').close()
  } 

  const del = async () =>
  {
    setIsLoading(true)

    setIsLoading(true)

    await Restful.delete(route, active.id)
    .then((res) =>
    {
        setAlertMsg('Successfully deleted subject');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); }, [1500])
    })
    .catch((res) =>
    {
        setAlertMsg('Failed to delete subject');
        setAlertType('error');
        setShowAlert(true);
        setIsLoading(false)
    });
  }

  const reset = () =>
  {
    setCode('');
    setUnits('');
    setDescription('');
    setCourse('');
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
        setFiltered(subjects);

        return;
    }

    const searched = subjects.filter((item) => 
    {
        const lItem = item.code.toLowerCase();
        const lDesc = item.description.toLowerCase();
        const lSearch = search.toLowerCase();

        return lItem.includes(lSearch) || lDesc.includes(lSearch)
    })

    setFiltered(searched);
  }

  useEffect(() =>
  {
    getAll()
    getCourses()
  }, [])

  useEffect(() =>
  {
    filter()
  }, [search])

  return (
    <>
        <div>
            <div className="flex justify-between">
                <button className="btn bg-blue-500 hover:bg-blue-700 text-white" onClick={() => openModal(0)}>Add Subject</button>
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
                        <th className="w-[15%] text-center">Code</th>
                        <th className="w-[30%] text-center">Description</th>
                        <th className="w-[5%] text-center">Units</th>
                        <th className="w-[35%] text-center">Course</th>
                        <th className="w-[10%]"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        filtered.map(item =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td className="text-center">{item.code}</td>
                            <td className="text-center">{item.description}</td>
                            <td className="text-center">{item.units}</td>
                            <td className="text-center">{item.course.name}</td>
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

        <dialog id="subject_modal" className="modal">
            <div className="modal-box bg-white">
                <h3 className="font-bold text-lg">{modalTypes[modalType]} Subject</h3>
                {modalType === 2 ?
                  <p className="py-4">Delete the subject [{active.name}]?</p>
                :
                  <div className="py-4">
                      <label className="input flex items-center gap-2 my-1">
                          <input type="text" className="grow" name="code" id="code"  placeholder="Code" value={code} onChange={(e) => setInput(e)} disabled={isLoading} required/>
                      </label>
                      <label className="input flex items-center gap-2 my-1">
                          <input type="number" className="grow" name="units" id="units"  placeholder="Units" value={units} onChange={(e) => setInput(e)} disabled={isLoading} required/>
                      </label>
                      <label className="input flex items-center gap-2 my-1">
                          <input type="text" className="grow" name="description" id="description"  placeholder="Description" value={description} onChange={(e) => setInput(e)} disabled={isLoading} required/>
                      </label>
                      <Dropdown label={'Course'} name={'course'} items={courses} display={'name'} setValue={setCourse} showLabel={false} defaultValue={course}></Dropdown>
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

export default Subject
import { useState, useEffect } from 'react'

import Alert from './Alert'

import Restful from '../utils/restful'
import Dropdown from './Dropdown'
import Schedule from './Schedule'

const route = 'schedule'

const modalTypes = 
{
    0: 'Add',
    1: 'Update',
    2: 'Delete'
}

const daysList =
[
  {
    id: 1,
    name: 'MWF'
  },
  {
    id: 2,
    name: 'TTH'
  },
  {
    id: 3,
    name: 'MON'
  },
  {
    id: 4,
    name: 'TUES'
  },
  {
    id: 5,
    name: 'WED'
  },
  {
    id: 6,
    name: 'THURS'
  },
  {
    id: 7,
    name: 'FRI'
  },
  {
    id: 8,
    name: 'SAT'
  },
  {
    id: 9,
    name: 'SUN'
  },
]

const times =
{
  1:
  [
    {
      id: 1,
      name: "1:00 PM - 2:00 PM",
      timeStart: '13:00',
      timeEnd: '14:00',
    },
    {
      id: 2,
      name: "2:00 PM - 3:00 PM",
      timeStart: '14:00',
      timeEnd: '15:00',
    },
    {
      id: 3,
      name: "3:00 PM - 4:00 PM",
      timeStart: '15:00',
      timeEnd: '16:00',
    },
    {
      id: 4,
      name: "4:00 PM - 5:00 PM",
      timeStart: '16:00',
      timeEnd: '17:00',
    },
    {
      id: 5,
      name: "5:00 PM - 6:00 PM",
      timeStart: '17:00',
      timeEnd: '18:00'
    },
    {
      id: 6,
      name: "6:00 PM - 7:00 PM",
      timeStart: '18:00',
      timeEnd: '19:00'
    },
    {
      id: 7,
      name: "7:00 PM - 8:00 PM",
      timeStart: '19:00',
      timeEnd: '20:00'
    },
  ],
  2:
  [
    {
      id: 8,
      name: "12:30 PM - 2:00 PM",
      timeStart: '12:30',
      timeEnd: '14:00'
    },
    {
      id: 9,
      name: "2:00 PM - 3:30 PM",
      timeStart: '14:00',
      timeEnd: '15:30'
    },
    {
      id: 10,
      name: "3:30 PM - 5:00 PM",
      timeStart: '15:30',
      timeEnd: '17:00'
    },
    {
      id: 11,
      name: "5:00 PM - 6:30 PM",
      timeStart: '17:00',
      timeEnd: '18:30'
    },
    {
      id: 12,
      name: "6:30 PM - 8:00 PM",
      timeStart: '18:30',
      timeEnd: '20:00'
    },
  ]
}

const Schedules = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isLoading, setIsLoading ] = useState(false)

  // Modal Inputs
  const [ time, setTime ] = useState('');
  const [ timeStart, setTimeStart ] = useState('');
  const [ timeEnd, setTimeEnd ] = useState('');
  const [ days, setDays ] = useState('');
  const [ subject, setSubject ] = useState('');
  const [ teacher, setTeacher ] = useState('');
  const [ room, setRoom ] = useState('');

  const [ active, setActive ] = useState(null);
  const [ search, setSearch ] = useState('');

  // Search/View Queries
  const [ course, setCourse ] = useState('');
  const [ section, setSection ] = useState('');
  const [ department, setDepartment ] = useState('');
  const [ year, setYear] = useState('');

  // Dropdowns
  // Search/View Queries
  const [ courses, setCourses ] = useState([]);
  const [ sections, setSections ] = useState([]);
  const [ departments, setDepartments ] = useState([]);
  const [ years, setYears] = useState([]);
  const [ teachers, setTeachers] = useState([]);
  const [ subjects, setSubjects] = useState([]);

  // Alert States  
  const [ showAlert, setShowAlert ] = useState(false);
  const [ alertMsg, setAlertMsg ] = useState(null);
  const [ alertType, setAlertType ] = useState('success');

  const [ schedule, setSchedule ] = useState([]);
  const [ schedules, setSchedules ] = useState([]);
  const [ filtered, setFiltered ] = useState([]);

  const inputs =
  {
    'time': setTime,
    'days': setDays,
    'subject': setSubject,
    'teacher': setTeacher,
    'room': setRoom,
    'course': setCourse,
    'section': setSection,
    'department': setDepartment,
    'search': setSearch,
    'year': setYear,
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
        start_time: timeStart,
        end_time: timeEnd,
        day_id: days,
        room,
        year_id: year,
        subject_id: subject,
        teacher_id: teacher,
        course_id: course,
        section_id: section,
        department_id: department
    };

    setIsLoading(true)

    await Restful.store(route, payload)
    .then((res) =>
    {
        setAlertMsg('Successfully added schedule');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); }, [1500])
    })
    .catch((res) =>
    {
        setAlertMsg('Failed to add schedule');
        setAlertType('error');
        setShowAlert(true);
        setIsLoading(false)
    });
  }

  const fetch = async (id) =>
  {
    const response = await Restful.find(route, id).then((res) => res.data.data);

    const days = response.day_id;
    
    const start = response.start_time;

    const end = response.end_time;

    setDays(days);

    if (days > 2)
    {
      setTimeStart(start);
      setTimeEnd(end);
    }
    else
    {
      parseTime({days, start, end});
    }

    setTeacher(response.teacher_id);
    setRoom(response.room);

    setSchedule(response);
  }

  const parseTime = ({id, days, start, end}) =>
  {
    let includes = false;

    if (id)
    {
      const day = id < 8 ? 1 : 2;

      setTimeStart(times[day][id].timeStart)
      setTimeEnd(times[day][id].timeEnd)

      return;
    }

    times[days].forEach((time) =>
    {
      if (time.timeStart == start && time.timeEnd == end)
      {
        setTime(time.id);
        setTimeStart(time.timeStart);
        setTimeEnd(time.timeEnd);

        includes = true;

        return
      }
    })

    if (! includes)
    {
      setTimeStart(start);
      setTimeEnd(end);
    }
  }

  const fetchCompleteSchedule = async () =>
  {
    const payload =
    {
      course,
      section,
      year,
      toggle: 0
    }
    const response = await Restful.get(route, payload).then((res) => res);

    parseSchedules(response);
  }

  const update = async () =>
  {
    setIsLoading(true)

    const payload =
    {
        start_time: timeStart,
        end_time: timeEnd,
        day_id: days,
        room,
        year_id: year,
        subject_id: subject,
        teacher_id: teacher,
        course_id: course,
        section_id: section,
        department_id: department
    };

    setIsLoading(true)

    await Restful.update(route, active.id, payload)
    .then((res) =>
    {
        setAlertMsg('Successfully updated schedule');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); }, [1500])
    })
    .catch((res) =>
    {
        setAlertMsg('Failed to update schedule');
        setAlertType('error');
        setShowAlert(true);
        setIsLoading(false)
    });
  }

  const parseSchedules = (schedules) =>
  {
    let parsed = { 0: [], 1: [], 2: [] };

    schedules.forEach(item =>
    {
      let day = item.day_id;

      day > 2 ? parsed[2].push(item) : parsed[day-1].push(item);
    })

    setSchedule(parsed);
  }

  const openModal = async (type, payload = { timeStart: null, timeEnd: null, days: null }, id = null) => 
  {
    if(id) await fetch(id);

    if(payload.days) setDays(payload.days)

    parseTime({days: payload.days, start: payload.timeStart, end: payload.timeEnd})

    setModalType(type);

    document.getElementById('schedule_modal').showModal()
  }

  const closeModal = () => 
  {
    document.getElementById('schedule_modal').close()
  } 

  const del = async () =>
  {
    setIsLoading(true)

    setIsLoading(true)

    await Restful.delete(route, active.id)
    .then((res) =>
    {
        setAlertMsg('Successfully deleted schedule');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); }, [1500])
    })
    .catch((res) =>
    {
        setAlertMsg('Failed to delete schedule');
        setAlertType('error');
        setShowAlert(true);
        setIsLoading(false)
    });
  }

  const reset = () =>
  {
    setTime('');
    setDays('');
    setSubject('');
    setTeacher('');
    setRoom('');
    setCourse('');
    setSection('');
    setDepartment('');
    setSearch('');
    setAlertMsg('');
    setActive({});
    setShowAlert(false);
    closeModal();

    // getAll();
  }

  const filter = ()  =>
  {
    if (search.length < 1)
    {
        setFiltered(schedules);

        return;
    }

    const searched = schedules.filter((item) => 
    {
        const lItem = item.name.toLowerCase();
        const lSearch = search.toLowerCase();

        return lItem.includes(lSearch)
    })

    setFiltered(searched);
  }

  useEffect(() =>
  {
    // getAll()
    getCourses()
    getSections()
    getDepartments()
    getYears()
    getTeachers()
  }, [])

  const getCourses = async () => {
    const response = await Restful.get('course');

    setCourses(response)
  }

  const getSections = async () => {
    const response = await Restful.get('section');

    setSections(response)
  }

  const getDepartments = async () => {
    const response = await Restful.get('department');

    setDepartments(response)
  }

  const getYears = async () => {
    const response = await Restful.get('year');

    setYears(response)
  }

  const getTeachers = async () => {
    const response = await Restful.get('user', { isAdmin: 0 });

    setTeachers(response)
  }

  useEffect(() =>
  {
    filter()
  }, [search])

  return (
    <>
        <div>
            <div className="flex justify-between">
                <button className="btn bg-blue-500 hover:bg-blue-700 text-white" onClick={() => openModal(0)}>Add Schedule</button>
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
              <h2 className="text-center">Choose a schedule to be viewed: </h2>
              <div className="flex gap-4 justify-center items-end">
                <Dropdown label={'Year'} name={'year'} items={years} display={'sy'} setValue={setYear} showLabel={true} defaultValue={year}></Dropdown>
                <Dropdown label={'Department'} name={'department'} items={departments} display={'name'} setValue={setDepartment} showLabel={true} defaultValue={department}></Dropdown>
                <Dropdown label={'Course'} name={'course'} items={courses} display={'name'} setValue={setCourse} showLabel={true} defaultValue={course} filterLabel={'department_id'} filterValue={department} disabled={! department}></Dropdown>
                <Dropdown label={'Section'} name={'section'} items={sections} display={'name'} setValue={setSection} showLabel={true} defaultValue={section} filterLabel={'course_id'} filterValue={course} disabled={! course}></Dropdown>
                <button className="btn btn-primary" disabled={! course || ! section || ! year} onClick={() => fetchCompleteSchedule()}>View</button>
              </div>
            </div>

            <div>
              {schedule.length == 0 ? 
                <h2 className="text-center">No schedules found.</h2>
                :
                [0, 1, 2].map(item => {
                  if (schedule[item].length > 0)
                  {
                    return <Schedule key={item} items={schedule[item]}></Schedule>
                  }
                })
              }
            </div>
        </div>

        <dialog id="schedule_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{modalTypes[modalType]} Schedule</h3>
                {modalType === 2 ?
                  <p className="py-4">Delete the schedule [{active.name}]?</p>
                :
                  <div className="py-4">
                      <Dropdown label={'Days'} name={'days'} items={daysList} display={'name'} setValue={setDays} showLabel={true} defaultValue={days}></Dropdown>
                      {days < 3 ?
                        <Dropdown label={'Time'} name={'time'} items={times[days]} display={'name'} setValue={setTime} showLabel={true} defaultValue={time} disabled={! days}></Dropdown>
                        :
                        <div className="flex gap-2 my-2">
                          <div className="w-[100%]">
                            <label className="my-2">
                              Time Start
                            </label>
                            <input type="time" className="input input-bordered w-[100%]" name="room" id="room"  placeholder="Time Start" value={room} onChange={(e) => setInput(e)} disabled={isLoading} required/>
                          </div>
                          <div className="w-[100%]">
                            <label className="my-2">
                              Time End
                            </label>
                            <input type="time" className="input input-bordered w-[100%]" name="room" id="room"  placeholder="Time End" value={room} onChange={(e) => setInput(e)} disabled={isLoading} required/>
                          </div>
                        </div>
                      }
                      <Dropdown label={'Year'} name={'year'} items={years} display={'sy'} setValue={setYear} showLabel={true} defaultValue={year}></Dropdown>
                      <Dropdown label={'Department'} name={'department'} items={departments} display={'name'} setValue={setDepartment} showLabel={true} defaultValue={department}></Dropdown>
                      <Dropdown label={'Course'} name={'course'} items={courses} display={'name'} setValue={setCourse} showLabel={true} defaultValue={course} filterLabel={'department_id'} filterValue={department} disabled={! department}></Dropdown>
                      <Dropdown label={'Section'} name={'section'} items={sections} display={'name'} setValue={setSection} showLabel={true} defaultValue={section} filterLabel={'course_id'} filterValue={course} disabled={! course}></Dropdown>
                      <Dropdown label={'Teacher'} name={'teacher'} items={teachers} display={'name'} setValue={setTeacher} showLabel={true} defaultValue={teacher} filterLabel={'department_id'} filterValue={department} disabled={! department}></Dropdown>
                      <label className="my-2">
                        Room
                      </label>
                      <input type="text" className="input input-bordered w-[100%] flex grow" name="room" id="room"  placeholder="Room" value={room} onChange={(e) => setInput(e)} disabled={isLoading} required/>
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

export default Schedules
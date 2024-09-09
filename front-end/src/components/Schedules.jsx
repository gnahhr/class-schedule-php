import { useState, useEffect } from 'react'

import Alert from './Alert'

import Restful from '../utils/restful'
import Dropdown from './Dropdown'
import Schedule from './Schedule'
import TIMES from '../constants/time'

const route = 'schedule'

const modalTypes = 
{
    0: 'Add',
    1: 'Update',
    2: 'Delete',
    3: 'Add Custom'
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

const times = TIMES

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
    'timeStart': setTimeStart,
    'timeEnd': setTimeEnd,
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
        department_id: department,
    };

    setIsLoading(true)

    await Restful.store(route, payload)
    .then((res) =>
    {
        setAlertMsg('Successfully added schedule');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); fetchCompleteSchedule();}, [1500])
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
    setSubject(response.subject_id);
    setRoom(response.room);
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

    setSchedule(response);
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
        department_id: department,
    };

    setIsLoading(true)

    await Restful.update(route, active.id, payload)
    .then((res) =>
    {
        setAlertMsg('Successfully updated schedule');
        setAlertType('success');
        setShowAlert(true);

        setTimeout(() =>{ reset(); setIsLoading(false); fetchCompleteSchedule();}, [1500])
    })
    .catch((res) =>
    {
        setAlertMsg('Failed to update schedule');
        setAlertType('error');
        setShowAlert(true);
        setIsLoading(false)
    });
  }

  const openModal = async (type, id = null, days = null, start = null, end = null) => 
  {
    if(id) await fetch(id);

    if (days) setDays(days);

    if (start && end) parseTime({days, start, end});

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
    setSubject('');
    setTeacher('');
    setTimeStart('');
    setTimeEnd('');
    setTime('');
    setTeacher('');
    setRoom('');
    setDays('');
    setAlertMsg('');
    setActive({});
    setShowAlert(false);
    closeModal();
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
    getSubjects()
  }, [])

  const getCourses = async () => {
    const response = await Restful.get('course');

    setCourses(response)
  }

  const getSubjects = async () => {
    const response = await Restful.get('subject');

    setSubjects(response)
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

  return (
    <>
        <div>
            <div className="flex justify-between">
                {year && department && course && section && <button className="btn bg-blue-500 hover:bg-blue-700 text-white" onClick={() => openModal(3)}>Add Custom Schedule</button>}
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
                ['mwf', 'tth', 'custom'].map((item, index) => 
                {
                  if (Object.keys(schedule[item]).length > 0)
                  {
                    return <Schedule key={item} day={index} items={schedule[item]} openModal={openModal}></Schedule>
                  }
                }
                )
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
                      <Dropdown label={'Days'} name={'days'} items={modalType == 3 ? daysList.slice(2) : daysList} display={'name'} setValue={setDays} showLabel={true} defaultValue={days} disabled={days < 3 && days != ''}></Dropdown>
                      {days < 3 ?
                        <Dropdown label={'Time'} name={'time'} items={times[days]} display={'name'} setValue={setTime} showLabel={true} defaultValue={time} disabled={! days}></Dropdown>
                        :
                        <div className="flex gap-2 my-2">
                          <div className="w-[100%]">
                            <label className="my-2">
                              Time Start
                            </label>
                            <input type="time" className="input input-bordered w-[100%]" name="timeStart" id="timeStart"  placeholder="Time Start" value={timeStart} onChange={(e) => setInput(e)} disabled={isLoading} required/>
                          </div>
                          <div className="w-[100%]">
                            <label className="my-2">
                              Time End
                            </label>
                            <input type="time" className="input input-bordered w-[100%]" name="timeEnd" id="timeEnd"  placeholder="Time End" value={timeEnd} onChange={(e) => setInput(e)} disabled={isLoading} required/>
                          </div>
                        </div>
                      }
                      <Dropdown label={'Subject'} name={'subject'} items={subjects} display={'code'} setValue={setSubject} showLabel={true} defaultValue={subject} filterLabel={'course_id'} filterValue={course} disabled={! course}></Dropdown>
                      <Dropdown label={'Teacher'} name={'teacher'} items={teachers} display={'name'} setValue={setTeacher} showLabel={true} defaultValue={teacher} filterLabel={'department_id'} filterValue={department} disabled={! department}></Dropdown>
                      <label className="my-2">
                        Room
                      </label>
                      <input type="text" className="input input-bordered w-[100%] flex grow" name="room" id="room"  placeholder="Room" value={room} onChange={(e) => setInput(e)} disabled={isLoading} required/>
                  </div>
                }
                <Alert show={showAlert} type={alertType} message={alertMsg}></Alert>
                <div className="modal-action">
                        {(modalType === 0 || modalType === 3) && <button className="btn bg-green-500 hover:bg-green-700 text-white" onClick={() => add()} disabled={isLoading}><span>Add</span></button>}
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
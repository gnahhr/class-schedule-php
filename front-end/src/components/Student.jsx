import { useState, useEffect } from 'react'

import Dropdown from './Dropdown'
import Schedule from './Schedule'

import Restful from '../utils/restful'

const route = 'schedule'

const Student = () => {
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

  const [ schedule, setSchedule ] = useState([]);

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

  useEffect(() =>
  {
    // getAll()
    getCourses()
    getSections()
    getDepartments()
    getYears()
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

  return (
    <div className="flex h-[80vh] max-h-[80vh]">
        <div className="w-[15%] p-4 border-r-2">
            <Dropdown label={'Year'} name={'year'} items={years} display={'sy'} setValue={setYear} showLabel={true} defaultValue={year}></Dropdown>
            <Dropdown label={'Department'} name={'department'} items={departments} display={'name'} setValue={setDepartment} showLabel={true} defaultValue={department}></Dropdown>
            <Dropdown label={'Course'} name={'course'} items={courses} display={'name'} setValue={setCourse} showLabel={true} defaultValue={course} filterLabel={'department_id'} filterValue={department} disabled={! department}></Dropdown>
            <Dropdown label={'Section'} name={'section'} items={sections} display={'name'} setValue={setSection} showLabel={true} defaultValue={section} filterLabel={'course_id'} filterValue={course} disabled={! course}></Dropdown>
            <button className="btn bg-blue-500 hover:bg-blue-700 text-white w-[100%] my-2" onClick={() => fetchCompleteSchedule()} disabled={! year && ! course && ! department && ! section}><span className='my-auto'>Get Schedule</span></button>
        </div>
        <div className="w-[85%] max-h-[69vh] overflow-y-auto">
            <h1 className="text-center flex gap-10 mt-4 mx-5 border-2 rounded text-4xl font-bold justify-center">
                <span><small>S</small></span>
                <span><small>C</small></span>
                <span><small>H</small></span>
                <span><small>E</small></span>
                <span><small>D</small></span>
                <span><small>U</small></span>
                <span><small>L</small></span>
                <span><small>E</small></span>
            </h1>
            {schedule.length == 0 ? 
                <h2 className="text-center">No schedules found.</h2>
                :
                ['mwf', 'tth', 'custom'].map((item, index) => 
                {
                  if (Object.keys(schedule[item]).length > 0)
                  {
                    return <Schedule key={item} day={index} items={schedule[item]}></Schedule>
                  }
                }
                )
              }
        </div>
    </div>
  )
}

export default Student
import { useState, useEffect } from 'react'

import Dropdown from './Dropdown'
import Schedule from './Schedule'

import Restful from '../utils/restful'

const Student = () => {
  //Lists 
  const [ courses, setCourses ] = useState([]);
  const [ sections, setSections ] = useState([]);
  const [ years, setYears ] = useState([]);
  const [ schedules, setSchedules ] = useState([]);

  // Selected
  const [ course, setCourse ] = useState(null);
  const [ section, setSection ] = useState(null);
  const [ year, setYear ] = useState(null);

  useEffect(() =>
  {
    getLists();
  }, []);

  const getCourses = async () =>
  {
    const response = await Restful.get('course').then((res) => res)

    setCourses(response);
  }

  const getSections = async () =>
  {
    const response = await Restful.get('section').then((res) => res)

    setSections(response);
  }

  const getYears = async () =>
  {
    const response = await Restful.get('year').then((res) => res)

    setYears(response);
  }

  const getLists = () =>
  {
    getCourses();
    getSections();
    getYears();
  }

  const test = () =>
  {
    console.log(course, section, year)
  }

  return (
    <div className="flex h-[80vh] max-h-[80vh]">
        <div className="w-[15%] p-4 border-r-2">
            <Dropdown label={'Courses'} name={'courses'} items={courses} display={'name'} setValue={setCourse}></Dropdown>
            <Dropdown label={'Sections'} name={'section'} items={sections} display={'name'} setValue={setSection}></Dropdown>
            <Dropdown label={'Semester'} name={'semester'} items={years} display={'sy'} setValue={setYear}></Dropdown>
            <div className="btn bg-blue-500 hover:bg-blue-700 text-white w-[100%] my-2" onClick={() => test()}><span className='my-auto'>Get Schedule</span></div>
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
            <Schedule></Schedule>
            <Schedule></Schedule>
            <Schedule></Schedule>
        </div>
    </div>
  )
}

export default Student
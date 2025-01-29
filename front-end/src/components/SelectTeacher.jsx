import { useState, useEffect } from 'react'

import Dropdown from './Dropdown'
import TeacherSchedule from './TeacherSchedule'

import Restful from '../utils/restful'

const route = 'schedule'

const SelectTeacher = () => {
  // Search/View Queries
  const [ year, setYear] = useState('');

  // Search/View Queries
  const [ years, setYears] = useState([]);

  const [ schedule, setSchedule ] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'))

  const fetchCompleteSchedule = async () =>
  {
    const payload =
    {
      teacherId:user.teacherId,
      year,
      toggle: 0
    }
    const response = await Restful.get(route, payload).then((res) => res);

    setSchedule(response);
  }

  useEffect(() =>
  {
    // getAll()
    getYears()
  }, [])

  const getYears = async () => {
    const response = await Restful.get('year');

    setYears(response)
  }

  return (
    <div className="flex h-[80vh] max-h-[80vh]">
        <div className="w-[15%] p-4 border-r-2">
            <Dropdown label={'Year'} name={'year'} items={years} display={'sy'} setValue={setYear} showLabel={true} defaultValue={year}></Dropdown>
            <button className="btn bg-blue-500 hover:bg-blue-700 text-white w-[100%] my-2" onClick={() => fetchCompleteSchedule()} disabled={! year}><span className='my-auto'>Get Schedule</span></button>
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
                    return <TeacherSchedule key={item} day={index} items={schedule[item]}></TeacherSchedule>
                  }
                }
                )
              }
        </div>
    </div>
  )
}

export default SelectTeacher
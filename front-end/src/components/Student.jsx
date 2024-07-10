import React from 'react'

import Dropdown from './Dropdown'

const courseItems = 
[
    {
        value: 0,
        text: 'Something'
    },
    {
        value: 1,
        text: 'Something 1'
    },
    {
        value: 2,
        text: 'Something 2'
    },
]

const Student = () => {
  return (
    <div className="flex h-[80vh]">
        <div className="w-[15%] p-4 border-r-2">
            <Dropdown label={'Courses'} name={'courses'} items={courseItems}></Dropdown>
            <Dropdown label={'Sections'} name={'section'} items={courseItems}></Dropdown>
            <Dropdown label={'Semester'} name={'semester'} items={courseItems}></Dropdown>
            <block className="block bg-blue-700 border-2 border-blue-700 rounded text-white cursor-pointer text-center py-2 mt-2 hover:bg-transparent hover:text-blue-700 ">Get Schedule</block>
        </div>
        <div className="w-[85%]">
            <h1 className="text-center mt-4">SCHEDULE</h1>
            <table>

            </table>
        </div>
    </div>
  )
}

export default Student
import React from 'react'

const Schedule = ({times, items, add, edit, del}) => {
  return (
    <div className="mx-5 mt-2">
        <table className="border-2 w-[100%] text-center rounded">
            <thead>
              <tr>
                <th className="border-2" style={{width: '5%'}}>Day</th>
                <th className="border-2" style={{width: '20%'}}>Time</th>
                <th className="border-2" style={{width: '10%'}}>Subject Code</th>
                <th className="border-2" style={{width: '25%'}}>Description</th>
                <th className="border-2" style={{width: '25%'}}>Teacher</th>
                <th className="border-2" style={{width: '5%'}}>Room</th>
                <th className="border-2" style={{width: '5%'}}>Units</th>
                <th className="border-2" style={{width: '5%'}}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) =>
                <tr key={item.id}>
                  {index == 0 && <td className="border-2" rowSpan="9">{item.day.name}</td>}
                  {index == 0 && item.day_id > 2 && <td className="border-2">{item.day.name}</td>}
                  <td className="border-2">{item.time}</td>
                  <td className="border-2">{item.subject.code}</td>
                  <td className="border-2">{item.subject.description}</td>
                  <td className="border-2">{item.teacher.name}</td>
                  <td className="border-2">{item.room}</td>
                  <td className="border-2">{item.subject.units}</td>
                  <td className="border-2">
                    
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan="6">Units: {items.reduce((sum, val) => sum + parseInt(val.subject.units), 0)}</td>
              </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Schedule
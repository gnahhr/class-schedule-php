import React from 'react'

const Schedule = () => {
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
                <th className="border-2" style={{width: '10%'}}>Room</th>
                <th className="border-2" style={{width: '5%'}}>Units</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2" rowSpan="9">MON-WED-FRI</td>
                <td className="border-2">10:00AM - 11:30AM</td>
                <td className="border-2">PROG-1</td>
                <td className="border-2">Introduction to Programming</td>
                <td className="border-2">John Doe</td>
                <td className="border-2">Rm 204</td>
                <td className="border-2">2.0</td>
              </tr>
              <tr>
                <td className="border-2">10:00AM - 11:30AM</td>
                <td className="border-2">PROG-1</td>
                <td className="border-2">Introduction to Programming</td>
                <td className="border-2">John Doe</td>
                <td className="border-2">Rm 204</td>
                <td className="border-2">2.0</td>
              </tr>
              <tr>
                <td className="border-2">10:00AM - 11:30AM</td>
                <td className="border-2">PROG-1</td>
                <td className="border-2">Introduction to Programming</td>
                <td className="border-2">John Doe</td>
                <td className="border-2">Rm 204</td>
                <td className="border-2">2.0</td>
              </tr>
              <tr>
                <td className="border-2">10:00AM - 11:30AM</td>
                <td className="border-2">PROG-1</td>
                <td className="border-2">Introduction to Programming</td>
                <td className="border-2">John Doe</td>
                <td className="border-2">Rm 204</td>
                <td className="border-2">2.0</td>
              </tr>
              <tr>
                <td className="border-2">10:00AM - 11:30AM</td>
                <td className="border-2">PROG-1</td>
                <td className="border-2">Introduction to Programming</td>
                <td className="border-2">John Doe</td>
                <td className="border-2">Rm 204</td>
                <td className="border-2">2.0</td>
              </tr>
              <tr>
                <td className="border-2">10:00AM - 11:30AM</td>
                <td className="border-2">PROG-1</td>
                <td className="border-2">Introduction to Programming</td>
                <td className="border-2">John Doe</td>
                <td className="border-2">Rm 204</td>
                <td className="border-2">2.0</td>
              </tr>
              <tr>
                <td className="border-2">10:00AM - 11:30AM</td>
                <td className="border-2">PROG-1</td>
                <td className="border-2">Introduction to Programming</td>
                <td className="border-2">John Doe</td>
                <td className="border-2">Rm 204</td>
                <td className="border-2">2.0</td>
              </tr>
              <tr>
                <td className="border-2">10:00AM - 11:30AM</td>
                <td className="border-2">PROG-1</td>
                <td className="border-2">Introduction to Programming</td>
                <td className="border-2">John Doe</td>
                <td className="border-2">Rm 204</td>
                <td className="border-2">2.0</td>
              </tr>
              <tr>
                <td className="border-2">10:00AM - 11:30AM</td>
                <td className="border-2">PROG-1</td>
                <td className="border-2">Introduction to Programming</td>
                <td className="border-2">John Doe</td>
                <td className="border-2">Rm 204</td>
                <td className="border-2">2.0</td>
              </tr>
              <tr>
                <td colSpan="6">Units: 18.0</td>
              </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Schedule
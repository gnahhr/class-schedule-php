import React from 'react'

const Schedule = ({times, items, modalOpen}) => {

  const exists = ({start, end}) =>
    {
      if (! times ) return true;

      let includes = false;

      times[days].forEach((time) =>
      {
        if (time.timeStart == start && time.timeEnd == end)
        {
          includes = true;
        }
      })

      return includes
    }

  const formatTime = (time) =>
  {
    const times = time.split(':');

    return times[0] >= 12 ? `${(times[0] % 12) == 0 ? 12 : times[0] % 12}:${times[1]} PM` : `${times[0]}:${times[1]} AM`
  }

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
                  <td className="border-2">{formatTime(item.start_time)} - {formatTime(item.end_time)}</td>
                  <td className="border-2">{item.subject.code}</td>
                  <td className="border-2">{item.subject.description}</td>
                  <td className="border-2">{item.teacher.name}</td>
                  <td className="border-2">{item.room}</td>
                  <td className="border-2">{item.subject.units}</td>
                  <td className="border-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn bg-blue-500 hover:bg-blue-700 border-none text-white m-1">Actions</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow">
                            { exists({start: item.start_time, end: item.end_time}) ?
                              <>
                                <li onClick={() => openModal(1, item.id)}><a>Update</a></li>
                                <li onClick={() => openModal(2, item.id)}><a>Delete</a></li>
                              </>
                              :
                              <li onClick={() => openModal(0)}><a>Add</a></li>
                            }
                        </ul>
                    </div>
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
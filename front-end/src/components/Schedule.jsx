import { useState } from 'react'

const Schedule = ({items, openModal}) => {
  const [ keys, setKeys ] = useState(Object.keys(items));

  const parseKey = (key) =>
  {
    const keySplit = key.split('-');

    return formatTime(keySplit[0]) + ' - ' + formatTime(keySplit[1]);
  }

  const formatTime = (time) =>
  {
    if (! time) return;

    const times = time.split(':');

    return times[0] >= 12 ? `${(times[0] % 12) == 0 ? 12 : times[0] % 12}:${times[1]} PM` : `${times[0]}:${times[1]} AM`
  }

  const getUnits = () =>
  {
    let total = 0;

    keys.forEach(key => 
      {
        if (items[key].subject)
        {
          total = total + parseInt(items[key].subject.units)
        }
      }
    )

    return total
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
              {keys.map((key, index) =>
                <tr key={index}>
                  {index == 0 && items[key].day_id < 3 && <td className="border-2" rowSpan="9">{items[key].day.name}</td>}
                  {items[key].day_id > 2 && <td className="border-2">{items[key].day.name}</td>}
                  <td className="border-2">{parseKey(key)}</td>
                  {items[key].id ?
                    <>
                      <td className="border-2">{items[key].subject.code}</td>
                      <td className="border-2">{items[key].subject.description}</td>
                      <td className="border-2">{items[key].teacher.name}</td>
                      <td className="border-2">{items[key].room}</td>
                      <td className="border-2">{items[key].subject.units}</td>
                    </>
                    :
                    <>
                      <td className="border-2"></td>
                      <td className="border-2"></td>
                      <td className="border-2"></td>
                      <td className="border-2"></td>
                      <td className="border-2"></td>
                    </>
                  }
                  <td className="border-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn bg-blue-500 hover:bg-blue-700 border-none text-white m-1">Actions</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow">
                            { items[key].id ?
                              <>
                                <li onClick={() => openModal(1, items[key].id)}><a>Update</a></li>
                                <li onClick={() => openModal(2, items[key].id)}><a>Delete</a></li>
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
                <td colSpan="6">Units: {getUnits()}</td>
              </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Schedule
import React from 'react'

const Dropdown = ({label, name, items, display, setValue}) => {

  const fn = (e) =>
  {
    setValue(e.target.value)
  }

  return (
    <div className="flex flex-col mt-2">
        <label htmlFor={name}>{label}</label>
        <select id={name} name={name} onChange={(e) => fn(e)}  className="select select-bordered w-full max-w-xs">
          <option value={null} disabled selected defaultValue={undefined}>Select {name}</option>
            { items.map(item => <option key={item.id} value={item.id}>{item[display]}</option>)}
        </select>
    </div>
  )
}

export default Dropdown
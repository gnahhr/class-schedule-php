import React from 'react'

const Dropdown = ({label, name, items, display, setValue, showLabel = true, defaultValue = undefined}) => {

  const fn = (e) =>
  {
    setValue(e.target.value)
  }

  return (
    <div className="flex flex-col mt-2">
        {showLabel && <label htmlFor={name}>{label}</label>}
        <select id={name} name={name} defaultValue={defaultValue} onChange={(e) => fn(e)}  className="select select-bordered w-full">
          <option value={undefined} disabled>Select {name}</option>
            { items.map(item => <option key={item.id} value={item.id}>{item[display]}</option>)}
        </select>
    </div>
  )
}

export default Dropdown
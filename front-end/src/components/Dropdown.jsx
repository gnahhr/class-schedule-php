import React from 'react'

const Dropdown = ({label, name, items}) => {
  return (
    <div className="flex flex-col mt-2">
        <label htmlFor={name}>{label}</label>
        <select id={name} name={name} className="rounded">
            { items.map(item => <option value={item.value}>{item.text}</option>)}
        </select>
    </div>
  )
}

export default Dropdown
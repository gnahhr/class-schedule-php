import { useState, useEffect } from 'react'

const Dropdown = ({label, name, items, display, setValue, filterLabel, filterValue, disabled, showLabel = true, defaultValue = undefined}) => {
  const [ current, setCurrent ] = useState('');

  const fn = (e) =>
  {
    setCurrent(e.target.value);
    
    if (name == 'time')
    {
      setValue({id: e.target.value});
      return;
    }

    setValue(e.target.value);
  }

  const filter = (filterLabel, filterValue) =>
  {
    if (filterValue) return items.filter(item => {

      if (name == 'teacher' || name == 'admin')
      {
        return item[name][filterLabel] == filterValue
      }

      return item[filterLabel] == filterValue
    });

    return items;
  }

  const displayName = (item) =>
  {
    if (label == 'Section')
    {
      return `${item.year_level} - ${item.name}`
    }

    if (name == 'teacher' || name == 'admin')
    {
      return item[name].name;
    }
    
    return item[display];
  }

  useEffect(() =>
  {
    setCurrent(defaultValue);
  }, [defaultValue])

  return (
    <div className="flex flex-col mt-2">
        {showLabel && <label htmlFor={name}>{label}</label>}
        <select id={name} name={name} onChange={(e) => fn(e)} value={current} className="select select-bordered w-full" disabled={disabled}>
          <option key={9999} value={''} disabled={current} >Select {name}</option>
            {items && filter(filterLabel, filterValue).map(item => <option key={item.id} value={item.id}>{displayName(item)}</option>)}
        </select>
    </div>
  )
}

export default Dropdown
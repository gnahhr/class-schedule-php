const SideNav = ({navigate}) => {
  const links = ['Dashboard', 'Admin', 'Teacher', 'Schedule', 'Subject', 'Department', 'Course', 'Section', 'Year'];

  const navi = (menu) =>
  {
    console.log(item.toLower());
  }

  return (
    <ul className="menu menu-horizontal w-100 bg-base-200 border-r md:menu-vertical md:w-56 px-2 py-5">
      {
        links.map((item, index)=> <li key={index} onClick={() => navi(item)}><a>{item}</a></li>)
      }
    </ul>
  )
}

export default SideNav
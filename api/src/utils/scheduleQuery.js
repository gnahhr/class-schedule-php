
module.exports = exist = async (Year, MODEL, reqQuery, include) => {

  let {course, section, year, toggle} = reqQuery;

  let models = include
  
  if(parseInt(toggle) === 1){
    models = [{
      model: Year,
      where: {
        toggle: toggle,
      },
    },
    ...include,
  ]
  }
  
  const data = await MODEL.findAll({
    where: {
      course_id: course,
      section_id: section,
      year_id: year,
    },
    include: models
  });

  return data
}


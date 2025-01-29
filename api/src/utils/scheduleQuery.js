
module.exports = exist = async (Year, MODEL, reqQuery, include) => {

  let {course, section, year, toggle, teacherId} = reqQuery;

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

  if(teacherId)
  {
    const data = await MODEL.findAll({
      where: {
        teacher_id: teacherId,
      },
      include: models
    });

    return data
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



module.exports = (result) => {
  const data = JSON.stringify(result)

  const jsonData = JSON.parse(data)

  let mwf = {
    "13:00-14:00": [],     
    "14:00-15:00": [],     
    "15:00-16:00": [],     
    "16:00-17:00": [],     
    "17:00-18:00": [],     
    "18:00-19:00": [],     
    "19:00-20:00": [],
  }

  let tth = {
    "12:30-14:00": [],     
    "14:00-15:30": [],     
    "15:30-17:00": [],     
    "17:00-18:30": [],     
    "18:30-20:00": [],     
  }

  let custom = {}

  jsonData.forEach(element => {
    const time = element.start_time.concat('-', element.end_time)

    if(element.day_id === 1)    {
      mwf[time] = element
    }
    else if(element.day_id === 2){
      tth[time] = element
    }
    else {
      custom[time] = element
    }
  });

  return {mwf, tth, custom}

}


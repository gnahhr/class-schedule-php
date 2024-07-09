import React from 'react'
import Step1 from '../assets/step 1.png'
import Step2 from '../assets/step 2.png'
import Step3 from '../assets/step 3.png'

import Step from './Step'

const instructions =
[
    {
        image: Step1,
        instruction: 'Click at the Navigation bar above if you are a student or a teacher',
    },
    {
        image: Step2,
        instruction: 'Click a course or in the Case of teacher The teachers name that you want to see a schedule',
    },
    {
        image: Step3,
        instruction: 
        "Click a year and a section and the schedule table will pop it and it's ready for viewing",
    }
]

const Steps = () => {
  return (
    <div className="flex gap-5 justify-content-around mx-10">
        {instructions.map((item, index) =>
            {
                return <Step key={index+1} step={index+1} image={item.image} instruction={item.instruction} />
            })
        }
    </div>
  )
}

export default Steps
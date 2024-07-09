import React from 'react'

const Step = ({step, image, instruction}) => {
  return (
    <div className="rounded border-2">
        <p className="bg-blue-600 rounded-t text-white text-center text-lg py-2">Step {step}</p>
        <img src={image} alt="image" className="h-60 object-contain mx-auto px-2" />
        <p className="px-2 text-center">{instruction}</p>
    </div>
  )
}

export default Step
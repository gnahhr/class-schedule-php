const ERROR_MESSAGE = require('../constants/error-message')

module.exports = exist = async (model, value = null, conditions = null) => {

  if(value){
    const check = await model.find({where:{value: value}})
  
    if(check) return ERROR_MESSAGE.ALREADY_EXIST
  
    return null
  }

  if(conditions){
    const check = await model.find({where:{conditions}})
  
    if(check) return (ERROR_MESSAGE.ALREADY_EXIST)
  
    return null    
  }
}
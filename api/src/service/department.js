const DEPARTMENT = require('../models/department');

const ERROR_MESSAGE = require('../constants/error-message')

const CREATE = async (reqBody) => {
  try {
    const {name, code} = reqBody

    const exists = await DEPARTMENT.findOne({where:{ name: name}})

    if(exists) throw (ERROR_MESSAGE.ALREADY_EXIST)

    const payload = {
      name: name,
      code: code
    }

    await DEPARTMENT.create(payload)

    return null

  } catch (error) {
    throw error
  }
}

const UPDATE = async (reqBody, reqParams) => {
  try {

    const { id } = reqParams

    const find = await DEPARTMENT.findByPk(id)

    
    if(!find) throw(ERROR_MESSAGE.DO_NOT_EXIST)

    await find.update(reqBody)

    await find.save()

    return null

  } catch (error) {
    throw error
  }
}


const GET = async () => {
  try {
    const data = await DEPARTMENT.findAll()

    return data
  } catch (error) {
    throw error
  }
}

const FIND = async (reqParams) => {
  try {
    const {id} = reqParams

    const data = await DEPARTMENT.findByPk(id)

    if(!data) throw(ERROR_MESSAGE.DO_NOT_EXIST)

    return data
  } catch (error) {
    throw error
  }
}

const DELETE = async (reqParams) => {
  try {
    const {id} = reqParams

    const data = await DEPARTMENT.findByPk(id)

    if(! data) throw(ERROR_MESSAGE.DO_NOT_EXIST)

    await data.destroy()

    return null;
  } catch (error) {
    throw error
  }
}


module.exports = {
  CREATE,
  UPDATE,
  DELETE,
  GET,
  FIND,
}
//service
const service = require('../service/department')
//constant
const ERROR_MESSAGE = require('../constants/error-message')
const SUCCESS_MESSAGE = require('../constants/success-message')

const CREATE = async (req, res) => {
  try {
    await service.CREATE(req.body)

    return res.json({...SUCCESS_MESSAGE.CREATE_SUCCESS})
  } catch (error) {
    if(error) res.json(error)
    console.log(error)
  }
}

const UPDATE = async (req, res) => {
  try {

    await service.UPDATE(req.body, req.params)
    
    return res.json({...SUCCESS_MESSAGE.UPDATE_SUCCESS})
  } catch (error) {
    if(error) res.json(error)
    console.log(error)
  }
}

const GET = async (req, res) => {
  try {
    const response = await service.GET(req.body, req.params)

    return res.json({...SUCCESS_MESSAGE.FETCH_SUCCESS, response})
  } catch (error) {
    if(error) res.json(error)
    console.log(error)
  }
}

const FIND = async (req, res) => {
  try {
    const data = await service.FIND(req.params)

    return res.json({...SUCCESS_MESSAGE.FETCH_SUCCESS, data})
  } catch (error) {
    if(error) res.json(error)
    console.log(error)
  }
}

const DELETE = async (req, res) => {
  try {
    await service.DELETE(req.params)

    return res.json({...SUCCESS_MESSAGE.DELETE_SUCCESSFULLY})
  } catch (error) {
    if(error) res.json(error)
    console.log(error)
  }
}

module.exports = {
  CREATE,
  UPDATE,
  DELETE,
  GET,
  FIND,
}
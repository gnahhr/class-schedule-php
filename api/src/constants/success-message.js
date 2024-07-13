const STATUS_CODE = require('./status-code')
const STATUS = require('./status')


const successMessage = {
  //general success message

  USER_SUCCESS_REGISTRATION: {
    status: STATUS.OK,
    statusCode: STATUS_CODE.CREATED,
    message: 'User Registration Successful',
  },

  CREATE_SUCCESS: {
    status: STATUS.OK,
    statusCode: STATUS_CODE.CREATED,
    message: 'Created Successfully',
  },

  ADMIN_LOGIN_SUCCESS: {
    status: STATUS.OK,
    statusCode:STATUS_CODE.SUCCESS,
    message:'Admin Login Successfully'
  },

  TEACHER_LOGIN_SUCCESS: {
    status: STATUS.OK,
    statusCode:STATUS_CODE.SUCCESS,
    message:'Teacher Login Successfully'
  },

  UPDATE_SUCCESS: {
    status: STATUS.OK,
    statusCode:STATUS_CODE.SUCCESS,
    message:'update success'
  },

  DELETE_SUCCESSFULLY: {
    status: STATUS.OK,
    statusCode:STATUS_CODE.SUCCESS,
    message:'Deleted Successfully'
  },

  FETCH_SUCCESS:{
    status: STATUS.OK,
    statusCode: STATUS_CODE.SUCCESS,
    message: 'Fetched Successfully',
  },
  
}


module.exports = successMessage;
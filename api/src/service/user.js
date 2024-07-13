const USER = require('../models/user');
const TEACHER = require('../models/teacher');
const ADMIN = require('../models/admin');
const bcrypt = require('bcrypt')

const saltRounds = 10

const ERROR_MESSAGE = require('../constants/error-message')

const REGISTER = async (reqBody) => {
    try {
        const {password, userName, roleId, name, departmentId } = reqBody

        const checkIfUserExist = await USER.findOne({where:{ userName: userName}})

        if(checkIfUserExist) throw (ERROR_MESSAGE.USER_ERROR_TAKEN)

        const hashPassword = bcrypt.hashSync(password,saltRounds)

        const userPayload = {
            userName:userName.toLowerCase(),
            password:hashPassword,
            roleId:roleId
        }

        const user = await USER.create(userPayload)

        if(roleId === 0){
            const exist = await ADMIN.findOne({where:{ name: name}})

            if(exist) throw (ERROR_MESSAGE.USER_ERROR_TAKEN)

            await ADMIN.create({name: name, userId:user.id})
        }

        if(roleId === 1){

            const exist = await TEACHER.findOne({where:{ name: name}})

            if(exist) throw (ERROR_MESSAGE.USER_ERROR_TAKEN)

            const payload = {
                name: name,
                departmentId: departmentId
            }

            await TEACHER.create({payload})
        }

        return null

    } catch (error) {
        throw error
    }
}

const LOGIN = async (reqBody) => {
    try {
        const {userName, password } = reqBody

        const findUser = await USER.findOne({where:{userName: userName}} )
        
        if(!findUser) throw(ERROR_MESSAGE.USER_ERROR_DO_NOT_EXIST)

        const comparePassword = await bcrypt.compare(password, findUser.password)

        if (!comparePassword) throw(ERROR_MESSAGE.USER_ERROR_INVALID_PASSWORD)

        return findUser
    } catch (error) {
        throw error
    }
}


const UPDATE_USER = async (reqBody, reqQuery) => {
    try {
        const {email} = reqQuery

        const findUser = await USER.findOneAndUpdate({email: email} ,reqBody, {new:true})

        if(!findUser) throw(ERROR_MESSAGE.USER_ERROR_DO_NOT_EXIST)

        return findUser
    } catch (error) {
        throw error
    }
}

const DELETE_USER = async (reqQuery) => {
    try {
        const {email} = reqQuery

        const findUsers = await USER.findOne({email:email})

        if(!findUsers) throw(ERROR_MESSAGE.USER_ERROR_DO_NOT_EXIST)

        await USER.findOneAndDelete({email:email})

        return true
    } catch (error) {
        throw error
    }
}

const GET_USER = async (reqQuery) => {
    try {
        const {email} = reqQuery

        const getUser = await USER.findOne({email:email}, {email:1, userName:1})

        return getUser
    } catch (error) {
        throw error
    }
}

const GET_ALL_USER = async () => {
    try {
        const getUser = await USER.find()

        return getUser
    } catch (error) {
        throw error
    }
}


module.exports = {
    REGISTER,
    LOGIN,
    DELETE_USER,
    UPDATE_USER,
    GET_USER,
    GET_ALL_USER,
}
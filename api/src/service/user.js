const USER = require('../models/user');
const TEACHER = require('../models/teacher');
const ADMIN = require('../models/admin');
const bcrypt = require('bcrypt')

const saltRounds = 10

const ROLE_TEACHER = 0

const ROLE_ADMIN = 1

const ERROR_MESSAGE = require('../constants/error-message');

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

        if(roleId === ROLE_ADMIN){
            const exist = await ADMIN.findOne({where:{ name: name}})

            if(exist) throw (ERROR_MESSAGE.USER_ERROR_TAKEN)

            await ADMIN.create({name: name, user_id:user.id})
        }

        if(roleId === ROLE_TEACHER){

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

        if(! findUser) throw (ERROR_MESSAGE.DO_NOT_EXIST)

        const comparePassword = await bcrypt.compare(password, findUser.password)

        if (!comparePassword) throw(ERROR_MESSAGE.USER_ERROR_INVALID_PASSWORD)

        const user = {
          userName: findUser.userName,
          roleId: findUser.roleId
        }

        return user
    } catch (error) {
        
        throw error
    }
}


const UPDATE_USER = async (reqBody, reqParams) => {
    try {
        const { id } = reqParams;

        const find = await USER.findByPk(id);

        if (! find) throw(ERROR_MESSAGE.DO_NOT_EXIST);

        await find.update(reqBody);

        await find.save();

        return null;
    } catch (error) {
        throw error
    }
}

const DELETE_USER = async (reqParams) => {
    try {
        const { id } = reqParams;

        const data = await USER.findByPk(id);

        if (!data) throw(ERROR_MESSAGE.DO_NOT_EXIST);

        await data.destroy();

        return null;
    } catch (error) {
        throw error
    }
}

const GET_USER = async (reqParams, reqQuery) => {
    try {
        const { id } = reqParams; 
        const { isAdmin } = reqQuery; 

        let includeModels = [];

        if (parseInt(isAdmin) === ROLE_ADMIN) {
            includeModels.push({ model: ADMIN });
        } else {
            includeModels.push({ model: TEACHER });
        }

        const getUser = await USER.findOne({
            where: { id: id, roleId: isAdmin },
            include: includeModels,
        });

        return getUser;
    } catch (error) {
        throw error;
    }
};

const GET_ALL_USER = async (reqQuery) => {
    try {
        const { isAdmin } = reqQuery;

        let includeModels = [];

        if (parseInt(isAdmin) === ROLE_ADMIN) {
            includeModels.push({ model: ADMIN });
        } else {
            includeModels.push({ model: TEACHER });
        }

        const getUsers = await USER.findAll({
            where: { roleId: isAdmin }, 
            include: includeModels,
        });

        return getUsers;
    } catch (error) {
        throw error;
    }
};




module.exports = {
    REGISTER,
    LOGIN,
    DELETE_USER,
    UPDATE_USER,
    GET_USER,
    GET_ALL_USER,
}
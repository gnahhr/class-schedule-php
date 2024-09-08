const TYPE_SCHEDULE = 1
const Year = require('../models/year')
const scheduleQuery = require('../utils/scheduleQuery')
const parseSchedule = require('../utils/parseSchedule')

const createService = (MODEL, ERROR_MESSAGE, uniqueFields = [], include = [], type = null) => {
  return {
    CREATE: async (reqBody) => {
      try {
        const data = uniqueFields.reduce((acc, field) => {
          acc[field] = reqBody[field];
          return acc;
        }, {});

        const exists = await MODEL.findOne({ where: data });

        if (exists) throw(ERROR_MESSAGE.ALREADY_EXIST);

        await MODEL.create(reqBody);

        return null;
      } catch (error) {
        throw error;
      }
    },

    UPDATE: async (reqBody, reqParams) => {
      try {
        const { id } = reqParams;

        if(type === 'year'){
          if(parseInt(reqBody.toggle) === 1){
            const toggled = await MODEL.findOne({where:{toggle: 1}});
  
            if(toggled) throw(ERROR_MESSAGE.SCHEDULE_ALREADY_AVAILABLE_FOR_THIS_YEAR)
          }
        }

        const find = await MODEL.findByPk(id);

        if (!find) throw(ERROR_MESSAGE.DO_NOT_EXIST);

        await find.update(reqBody);
        await find.save();

        return null;
      } catch (error) {
        throw error;
      }
    },

    GET: async (reqQuery = null) => {
      try {
        
        if (type === 'Schedule' && reqQuery) {
          const data = await scheduleQuery(Year, MODEL, reqQuery, include)

          const parse = parseSchedule(data)

          return parse
        }

        if (type === 'year') {

          let { toggle } = reqQuery

          if (toggle) 
          {
            const data = await MODEL.findAll({
              where: {
                toggle: toggle,
              }},
              include,
              {
            });

            return data
          }
        }

        if (type === 'subject') {

          let { course } = reqQuery

          if (course) 
          {
            const data = await MODEL.findAll({
              where: {
                course_id: course,
              }},
              include,
              {
            });

            return data
          }
        }

        const data = await MODEL.findAll({
          include,
        });

        return data;

      } catch (error) {
        throw error;
      }
    },

    FIND: async (reqParams) => {
      try {

        if (type === 'Schedule' && reqQuery) {
          const data = scheduleQuery(Year, MODEL, reqQuery, include)

          return data
        }

        const { id } = reqParams;

        const data = await MODEL.findByPk(id, {
          include,
        });

        if (!data) throw(ERROR_MESSAGE.DO_NOT_EXIST);

        return data;
      } catch (error) {
        throw error;
      }
    },

    DELETE: async (reqParams) => {
      try {
        const { id } = reqParams;

        const data = await MODEL.findByPk(id);

        if (!data) throw(ERROR_MESSAGE.DO_NOT_EXIST);

        await data.destroy();

        return null;
      } catch (error) {
        throw error;
      }
    }
  };
};

module.exports = createService;

const TYPE_SCHEDULE = 1
const Year = require('../models/year')

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
        if (parseInt(type) === TYPE_SCHEDULE && reqQuery) {
          let {course, section, year, toggle} = reqQuery;

          let models = include

          if(parseInt(toggle) === 1){
            models = [{
              model: Year,
              where: {
                toggle: toggle,
              },
            },
            ...include,
          ]
         }
         
          const data = await MODEL.findAll({
            where: {
              course_id: course,
              section_id: section,
              year_id: year,
            },
            include: models
          });

          return data
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

        if(parseInt(type) === TYPE_SCHEDULE){
          const data = await MODEL.find({
            where: {
              course_id: reqParams.course_id,
              section_id: reqParams.section_id,
              year_id: reqParams.year_id,
            },
            include,
          });

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

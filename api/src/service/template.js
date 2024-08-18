const createService = (MODEL, ERROR_MESSAGE, uniqueFields = []) => {
  return {
    CREATE: async (reqBody) => {
      try {
        const data = uniqueFields.reduce((acc, field) => {
          acc[field] = reqBody[field];

          console.log(acc[field])
          console.log(reqBody[field])
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

    GET: async () => {
      try {
        const data = await MODEL.findAll();
        return data;
      } catch (error) {
        throw error;
      }
    },

    FIND: async (reqParams) => {
      try {
        const { id } = reqParams;

        const data = await MODEL.findByPk(id);

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

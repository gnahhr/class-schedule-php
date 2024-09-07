const createController = (service, SUCCESS_MESSAGE, ERROR_MESSAGE) => {
  return {
    CREATE: async (req, res) => {
      try {
        await service.CREATE(req.body);
        return res.json({ ...SUCCESS_MESSAGE.CREATE_SUCCESS });
      } catch (error) {
        res.status(400).json({ error: error.message || ERROR_MESSAGE.GENERIC_ERROR });
      }
    },

    UPDATE: async (req, res) => {
      try {
        await service.UPDATE(req.body, req.params);
        return res.json({ ...SUCCESS_MESSAGE.UPDATE_SUCCESS });
      } catch (error) {
        res.status(400).json({ error: error.message || ERROR_MESSAGE.GENERIC_ERROR });
      }
    },

    GET: async (req, res) => {
      try {
        const response = await service.GET(req.query);
        return res.status(200).json({ ...SUCCESS_MESSAGE.FETCH_SUCCESS, response});
      } catch (error) {
        res.status(400).json({ error: error.message || ERROR_MESSAGE.GENERIC_ERROR });
      }
    },

    FIND: async (req, res) => {
      try {
        const data = await service.FIND(req.params);
        return res.json({ ...SUCCESS_MESSAGE.FETCH_SUCCESS, data });
      } catch (error) {
        res.status(400).json({ error: error.message || ERROR_MESSAGE.GENERIC_ERROR });
      }
    },

    DELETE: async (req, res) => {
      try {
        await service.DELETE(req.params);
        return res.json({ ...SUCCESS_MESSAGE.DELETE_SUCCESSFULLY });
      } catch (error) {
        res.status(400).json({ error: error.message || ERROR_MESSAGE.GENERIC_ERROR });
      }
    }
  };
};

module.exports = createController;

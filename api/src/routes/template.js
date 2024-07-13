const express = require('express');

const createRouter = (controller) => {
  const router = express.Router();

  router.post('/', controller.CREATE);
  router.put('/:id', controller.UPDATE);
  router.get('/', controller.GET);
  router.get('/:id', controller.FIND);
  router.delete('/:id', controller.DELETE);

  return router;
};

module.exports = createRouter;

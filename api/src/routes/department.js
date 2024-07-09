const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.post('/user',userController.REGISTER);
router.post('/user/login',userController.LOGIN);
router.put('/user/:id',userController.UPDATE_USER);
router.delete('/user/:id',userController.DELETE_USER);
router.get('/user/:id',userController.GET_USER);
router.get('/user',userController.GET_ALL_USER);

module.exports = router;
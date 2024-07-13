const express = require('express');
const router = express.Router();
const department = require('../controller/department');

router.post('/department',department.CREATE);
router.put('/department/:id',department.UPDATE);
router.get('/department/:id',department.FIND);
router.get('/department',department.GET);
router.delete('/department/:id',department.DELETE);

module.exports = router;
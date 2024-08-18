const express = require("express");
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const SyncModels = require('./src/models/initialize');

SyncModels()

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

//routes
const USER = require('./src/routes/user')
const DEPARTMENT = require('./src/routes/department')
const YEAR = require('./src/routes/year')
const SUBJECT = require('./src/routes/subject')

app.use('/user',USER);
app.use('/year', YEAR);
app.use('/department', DEPARTMENT);
app.use('/subject', SUBJECT);

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});
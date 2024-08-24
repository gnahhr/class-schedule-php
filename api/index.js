const express = require("express");
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const SyncModels = require('./src/models/initialize');
const cors = require('cors');

SyncModels()

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT || 5000;

//routes
const USER = require('./src/routes/user')
const DEPARTMENT = require('./src/routes/department')
const YEAR = require('./src/routes/year')
const SUBJECT = require('./src/routes/subject')
const COURSE = require('./src/routes/course')
const SECTION = require('./src/routes/section')
const SCHEDULE = require('./src/routes/schedule')

app.use(USER);
app.use('/year', YEAR);
app.use('/department', DEPARTMENT);
app.use('/subject', SUBJECT);
app.use('/course', COURSE);
app.use('/section', SECTION);
app.use('/schedule', SCHEDULE);

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});
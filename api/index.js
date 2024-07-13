const express = require("express");
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();


app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

//routes
const USER = require('./src/routes/user')
const DEPARTMENT = require('./src/routes/department')
const YEAR = require('./src/routes/year')

app.use(USER);
app.use('/year', YEAR);
app.use('/department', DEPARTMENT);

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});
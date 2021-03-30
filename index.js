const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const attendance = require('./routes/attendance');
const result = require('./routes/result');
const announcement = require('./routes/announcement');
const exam = require('./routes/exam');
const admin = require('./routes/admin');
const timetable = require('./routes/timetable');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3001;

const MONGODB_URL = "mongodb://127.0.0.1:27017/SystoSecureDB"
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log(`Connected to ${MONGODB_URL}...`));

app.use(cors());
app.use(express.json());

app.use('/users', users);
app.use('/auth', auth);
app.use('/attendance', attendance);
app.use('/result', result);
app.use('/announcement', announcement);
app.use('/exam', exam);
app.use('/admin', admin);
app.use('/timetable', timetable);

Joi.objectId = require('joi-objectid')(Joi);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

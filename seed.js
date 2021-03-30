const mongoose=require('mongoose');
const {Attendance}=require('./models/attendance');
const moment = require('moment');

const data=[
    {
        username:"123456789dd",
        date: moment().format('l'),
        time:moment().format('h:mm:ss a')
    },
    {
        username:"123456789aa",
        date: moment().format('l'),
        time:moment().format('h:mm:ss a')
    }
];

async function seed(){
     const MONGODB_URL = "mongodb://127.0.0.1:27017/SystoSecureDB"
     await mongoose.connect(MONGODB_URL);
     
     await Attendance.insertMany(data);

     mongoose.disconnect();

     console.log('Done');
}

seed();


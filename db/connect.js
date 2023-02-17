const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

const connectDB = (url) =>{
    // this is returning a promise
    // here url is the connection string from .env file that is passed as an argument and is returned as a promise to the caller in app.js
    return mongoose.connect(url);
};

module.exports = connectDB;


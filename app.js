require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// database connect
const connectDB = require('./db/connect');

// import middlewares
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/not-found');

app.get('/',(req,res)=>{
    res.send('<h1>Home Page</h1>');
});

// invoke middlewares here
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=> console.log(`Server is listening on port ${port}...`));
    }
    catch(err){
        console.log(err);
    }
};

start();



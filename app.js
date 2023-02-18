require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');

// cloudinary (use v2 because v1 is deprecated)
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// database connect
const connectDB = require('./db/connect');

// routers 
const productRouter = require('./routes/productRoutes');

// import middlewares
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

app.use(express.static('./public')); // this will make the public folder static so that we can access the files in the public folder from the frontend
app.use(express.json());
app.use(fileUpload());

app.get('/',(req,res)=>{
    res.send('<h1>Home Page</h1>');
});

app.use('/api/v1/products', productRouter);


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



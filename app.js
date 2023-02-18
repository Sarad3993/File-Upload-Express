require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// database connect
const connectDB = require('./db/connect');

// routers 
const productRouter = require('./routes/productRoutes');

// import middlewares
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

app.use(express.json());

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



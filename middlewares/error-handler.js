const {StatusCodes} = require('http-status-codes');

const errorHandlerMiddleware = (err,req,res,next) =>{
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later',
    };

    // mongoose error handling for duplicate value entered in unique field

    if (err.code && err.code === 11000){
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, Please choose another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
        // here we can also write as:
        // customError.statusCode = 400;
    }
    // mongoose error handling for validation error
    if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // mongoose error handling for cast error

    if (err.name === 'CastError'){
        customError.msg = `No item found with id ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    return res.status(customError.statusCode).json({msg: customError.msg})
};


module.exports = errorHandlerMiddleware;

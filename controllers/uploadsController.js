const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require('../errors'); 
// here we are not destructuring every errors rather we are using the whole object ie CustomError and then below we access every error using dot operator like CustomError.BadRequestError
// we can do this or we can follow the destructuring method


const uploadProductImage = async (req, res) => {
    // console.log(req.files);
    // check if the file exists in the request or not 
    if (!req.files){
        throw new CustomError.BadRequestError("No file uploaded");
    }

    const productImage = req.files.image; // it gives the image file from the request

    // check if the file is an image or not (valid format)
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError("Please upload an image file");
    }

    // check for file Size 
    const maxSize = 1024 * 1024; // 1MB
    if(productImage.size > maxSize){
        throw new CustomError.BadRequestError('Please upload an image less than 1MB');
    } 

  const imagePath = path.join(__dirname,'../public/uploads/'+ `${productImage.name}`); 
  // __dirname is a global variable that gives the path of the current file i.e uploadsController.js
  // we are joining the path of the current file with the path of the public folder and uploads folder
  // we are also adding the name of the image file to the path
  // we are doing this so that we can save the image file in the uploads folder
  // initially image is accessed from the request and it is saved in the productImage variable and then we are saving it in the uploads folder

  await productImage.mv(imagePath); // this will now move the image file to the uploads folder
  return res.status(StatusCodes.OK).json({ image:{src:`/uploads/${productImage.name}`} }); // here we don't need to send the full path since we have already set the public folder as static in app.js and it will automatically look for the image in the uploads folder

};


module.exports = {uploadProductImage};

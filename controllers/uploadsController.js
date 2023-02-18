const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require('../errors'); 
// here we are not destructuring every errors rather we are using the whole object ie CustomError and then below we access every error using dot operator like CustomError.BadRequestError
// we can do this or we can follow the destructuring method
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


const uploadProductImageLocal = async (req, res) => {
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

const uploadProductImageCloudinary = async (req,res) => {

    // tempFilePath is the path of the image file in the temp folder which is provided by express-fileupload so still need express-fileupload even if we are using cloudinary to move the file to the cloud 
    // use_filename: true will use the original name of the file
    // folder: 'file-upload' will create a folder in the cloudinary account with the name file-upload and will save the file in that folder
    // initially the uploaded file is saved in the temp folder and then later we move it to the cloudinary account
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'file-upload',
    });
    // console.log(result);
    
    fs.unlinkSync(req.files.image.tempFilePath); 
    // this will delete the file from the temp folder after it has been moved to the cloudinary account to save space and not store locally
    // we are using sync version of the unlink function because we want to delete the file before sending the response to the frontend
    
    return res.status(StatusCodes.OK).json({image:{src:result.secure_url}}) 
    // secure_url is the url of the image file in the cloudinary account which we have to send as a response to the frontend so that it can display the image


};


module.exports = {uploadProductImageCloudinary,};

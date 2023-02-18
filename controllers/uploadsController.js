const path = require("path");
const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res) => {
  const productImage = req.files.image; // it gives the image file from the request
  const imagePath = path.join(__dirname,'../public/uploads/'+ `${productImage.name}`); 
  // __dirname is a global variable that gives the path of the current file i.e uploadsController.js
  // we are joining the path of the current file with the path of the public folder and uploads folder
  // we are also adding the name of the image file to the path
  // we are doing this so that we can save the image file in the uploads folder
  // initially image is accessed from the request and it is saved in the productImage variable and then we are saving it in the uploads folder

  await productImage.mv(imagePath); // this will now move the image file to the uploads folder
  return res.status(StatusCodes.OK).json({ image:{src:`/uploads/${productImage.name}`} }); // here we don't need to send the full path since we have already set the public folder as static in app.js and it will automatically look for the image in the uploads folder

};


module.exports = {
  uploadProductImage,
};

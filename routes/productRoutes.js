const router = require("express").Router();
const { createProduct, getAllProducts } = require("../controllers/productController");
const { uploadProductImageCloudinary } = require("../controllers/uploadsController");

router.route('/').post(createProduct).get(getAllProducts);
router.route('/uploads').post(uploadProductImageCloudinary);

module.exports = router;
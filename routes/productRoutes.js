const router = require("express").Router();
const { createProduct, getAllProducts } = require("../controllers/productController");
const { uploadProductImage } = require("../controllers/uploadsController");

router.route('/').post(createProduct).get(getAllProducts);
router.route('/uploads').post(uploadProductImage);

module.exports = router;
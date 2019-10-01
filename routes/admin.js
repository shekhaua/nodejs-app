const express = require('express');
const router = express.Router();

const {getProductsOverview, getAddProduct, actOnProduct, getEditProduct,
  getDeleteProduct} = require('../controllers/products');

router.get('/products-overview', getProductsOverview);
router.get('/add-product', getAddProduct);
router.post('/act-on-product', actOnProduct);
router.get('/edit-product/:productId', getEditProduct);
router.get('/delete-product/:productId', getDeleteProduct);

module.exports.router = router;
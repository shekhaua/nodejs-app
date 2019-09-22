const express = require('express');
const router = express.Router();

const {getProductsOverview, getAddProduct, postProduct, getEditProduct, getDeleteProduct} = require('../controllers/products');

router.get('/products-overview', getProductsOverview);
router.get('/add-product', getAddProduct);
router.post('/post-product', postProduct);
router.get('/edit-product', getEditProduct);
router.get('/delete-product', getDeleteProduct);

module.exports.router = router;
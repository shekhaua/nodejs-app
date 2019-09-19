const express = require('express');
const router = express.Router();

const {getAddProduct, postProduct} = require('../controllers/products');


router.get('/add-product', getAddProduct);
router.post('/product', postProduct);

module.exports.router = router;
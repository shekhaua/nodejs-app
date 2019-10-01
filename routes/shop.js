const express = require('express');
const router = express.Router();
const {getShop, getProductDetails, postAddToCart, getCart} = require('../controllers/shop');

router.get('/', getShop);
router.get('/product/:productId', getProductDetails);
router.post('/add-to-cart', postAddToCart);
router.get('/cart', getCart);

module.exports = router;
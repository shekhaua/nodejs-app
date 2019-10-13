const express = require('express');
const router = express.Router();
const {getShop, getProductDetails, addToCart, getCart, deleteFromCart, createOrder} = require('../controllers/shop');

router.get('/', getShop);
router.get('/product/:productId', getProductDetails);

router.get('/cart', getCart);
router.post('/cart/:productId', addToCart);
router.delete('/cart/:productId', deleteFromCart);

router.post('/order', createOrder);

module.exports = router;

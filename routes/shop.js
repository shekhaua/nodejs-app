const express = require('express');
const router = express.Router();
const {renderShop, renderProductDetails, addToCart, renderCart, deleteFromCart, createOrder } = require('../controllers/shop');

router.get('/', renderShop);
router.get('/product/:productId', renderProductDetails);

router.get('/cart', renderCart);
router.post('/cart/:productId', addToCart);
router.delete('/cart/:productId', deleteFromCart);

router.post('/order', createOrder);

module.exports = router;

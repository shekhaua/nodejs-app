const express = require('express');
const router = express.Router();
const {getShop} = require('../controllers/shop');

router.get('/', getShop);

module.exports = router;
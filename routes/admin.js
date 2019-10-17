const express = require('express');
const router = express.Router();

const {renderProducts, renderAddProduct, doAddProduct, doEditProduct, renderEditProduct,
  doDeleteProduct} = require('../controllers/products');

const {renderOrders} = require('../controllers/orders');

const BASE_PATH = '/admin';

router.get(`${BASE_PATH}/products`, renderProducts);
router.get(`${BASE_PATH}/products/add`, renderAddProduct);
router.get(`${BASE_PATH}/products/edit/:productId`, renderEditProduct);
router.post(`${BASE_PATH}/act-on-product`, doAddProduct);

router.put(`${BASE_PATH}/act-on-product`, doEditProduct);
router.delete(`${BASE_PATH}/product/:productId`, doDeleteProduct);

router.get(`${BASE_PATH}/orders`, renderOrders);

module.exports = router;

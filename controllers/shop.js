const Product = require('../models/product');

const getShop = (req, res/*, next*/) => {
  Product.fetchAll().then((products) => {
    res.render('shop/index', {docTitle: 'Shop', products, showProducts: products.length});
  });

};

module.exports = {
  getShop
};
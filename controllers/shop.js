const Product = require('../models/product');

const getShop = (req, res/*, next*/) => {
  //console.log('SHOP PRODUCTS',Product.fetchAll());
  Product.fetchAll().then((products) => {
    //res.render('hbs_shop', {docTitle: 'Shop - handlebars', products, showProducts: products.length}); // handlebars based template
    res.render('ejs_shop', {docTitle: 'Shop - ejs', products, showProducts: products.length});
  });

};

module.exports = {
  getShop
};
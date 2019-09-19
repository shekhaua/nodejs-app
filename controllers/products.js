const Product = require('../models/product');

const getAddProduct = (req, res/*, next*/) => {
  const products = Product.fetchAll().then((products) => {
    res.render('ejs_add-product', {docTitle: 'Add product - Ejs', products, showProducts: products.length});
  });
};

const postProduct = (req, res/*, next*/) => {
  if(req.body.title) {
    const p = new Product(req.body.title);
    p.save();
  }
  res.redirect('/admin/add-product');
};

module.exports = {
  getAddProduct,
  postProduct
};
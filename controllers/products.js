const Product = require('../models/product');

const getProductsOverview = (req, res/*, next*/) => {
  Product.fetchAll().then((products) => {
    res.render('admin/products-overview', {docTitle: 'Products Overview', products, showProducts: products.length});
  });
};

const getAddProduct = (req, res/*, next*/) => {
  Product.fetchAll().then((products) => {
    res.render('admin/add-product', {docTitle: 'Add product', products, showProducts: products.length});
  });
};

const postProduct = (req, res/*, next*/) => {
  if(req.body.title) {
    const {title, description, imageUrl} = req.body;
    const p = new Product(title, description, imageUrl);
    p.save();
  }
  res.redirect('/admin/add-product');
};

const getEditProduct = (req, res) => {
  res.render('admin/edit-product')
};

const getDeleteProduct = (req, res) => {
  res.render('admin/delete-product')
};

module.exports = {
  getProductsOverview,
  getAddProduct,
  postProduct,
  getEditProduct,
  getDeleteProduct
};
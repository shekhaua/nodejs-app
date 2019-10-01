const Product = require('../models/product');

const getProductsOverview = (req, res/*, next*/) => {
  Product.fetchAll().then((products) => {
    res.render('admin/products-overview', {docTitle: 'Products Overview', products, showProducts: products.length});
  });
};

const getAddProduct = (req, res/*, next*/) => {
  res.render('admin/add-edit-product', {docTitle: 'Add product', action: 'Add', product: {}, method: 'POST'});
};

const actOnProduct = (req, res/*, next*/) => {
  const {id, title, description, imageUrl, price, _method} = req.body;
  const p = new Product(id, title, description, imageUrl, price);

  if(_method === 'POST') {
    p.save();
    res.redirect('/admin/add-product');
  } else if(_method === 'PUT') {
    p.update();
    res.redirect('/admin/products-overview');
  }
};

const getEditProduct = (req, res) => {
  Product.fetchProductById(req.params.productId).then((product) => {
    console.log('PROD', product);
    res.render('admin/add-edit-product', {docTitle: 'Edit product', action: 'Edit', product, method: 'PUT'})
  });
};

const getDeleteProduct = (req, res) => {
  Product.deleteProduct(req.params.productId).then(() => {
    res.redirect('/admin/products-overview');
  });
};

module.exports = {
  getProductsOverview,
  getAddProduct,
  getEditProduct,
  getDeleteProduct,
  actOnProduct
};
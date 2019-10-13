const Product = require('../models/product');

const renderProducts = (req, res) => {
  const {user : User } = req;
  User.getProducts().then((products = []) => {
    res.render('admin/products', {docTitle: 'Products Overview', products, showProducts: products.length});
  });
};

const renderAddProduct = (req, res) => {
  res.render('admin/products-add-edit', {docTitle: 'Add product', action: 'Add', product: {}, method: 'POST'});
};

const renderEditProduct = (req, res) => {
  Product.read(req.params.productId).then((product) => {
    res.render('admin/products-add-edit', {docTitle: 'Edit product', action: 'Edit', product, method: 'PUT'})
  });
};

const doAddProduct = (req, res) => {
  const {title, description, imageUrl, price} = req.body;
  const {user: User} = req;
  User.createProduct({title, description, imageUrl, price}).then(() => {
    res.redirect('/admin/products');
  });
  /* Product.create({title, description, imageUrl, price, userId: User.id}).then(() => {
    res.redirect('/admin/products');
  });*/
};

const doEditProduct = (req, res) => {
  const {id, title, description, imageUrl, price} = req.body;
  const {user: User} = req;
  Product.update({id, title, description, imageUrl, price, userId: User.id}).then(() => {
    res.redirect('/admin/products');
  });
};

const doDeleteProduct = (req, res) => {
  Product.del(req.params.productId).then(() => {
    res.redirect('/admin/products');
  });
};

module.exports = {
  renderProducts,
  renderAddProduct,
  renderEditProduct,
  doAddProduct,
  doEditProduct,
  doDeleteProduct
};
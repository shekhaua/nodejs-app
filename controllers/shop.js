const Product = require('../models/product');
const Cart = require('../models/cart');

const getShop = (req, res/*, next*/) => {
  Product.fetchAll().then((products) => {
    res.render('shop/index', {docTitle: 'Shop', products, showProducts: products.length});
  });
};

const getProductDetails = (req, res) => {
  const id = req.params.productId;
  Product.fetchAll().then((products) => {
    const product = products.find(p => p.id === id);
    res.render('shop/product-details', {docTitle: 'Product details', products: [product], showProducts: products.length})
  });
};

const postAddToCart = (req, res) => {
  const id = req.body.productId;
  Cart.addCartItem(id);
  res.redirect('/cart');
};

const getCart = (req, res) => {
  let ids = Cart.getCartItemIds();
  Product.fetchProductsByIds(ids).then((products) => {
    let totalPrice = 0;
    products.forEach((prod) => {
      prod.quantity = Cart.getQuantityByItemId(prod.id);
      prod.priceSumm = prod.quantity * +(prod.price);
      totalPrice += prod.priceSumm;
    });
    res.render('shop/cart', {docTitle: 'Cart', products, showProducts: products.length, totalPrice})
  });
};

module.exports = {
  getShop,
  getProductDetails,
  postAddToCart,
  getCart
};
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const {handleError} = require("../utils/response-handlers");

const getShop = (req, res/*, next*/) => {
  Product.read().then((products) => {
    res.render('shop/index', {docTitle: 'Shop', products, showProducts: products.length});
  })
};

const getProductDetails = (req, res) => {
  Product.read(req.params.productId).then((product) => {
    res.render('shop/product-details', {docTitle: 'Product details', products:[product], showProducts: !!product})
  });
};

const addToCart = (req, res) => {
  Cart.addCartItem(req.params.productId);
  res.redirect('/cart');
};

const getCart = (req, res) => {
  let ids = Cart.getCartItemIds();
  Product.read(ids).then((products) => {
    let totalPrice = 0;
    products.forEach((prod) => {
      prod.quantity = Cart.getQuantityByItemId(prod.id);
      prod.priceSumm = prod.quantity * +(prod.price);
      totalPrice += prod.priceSumm;
    });
    res.render('shop/cart', {docTitle: 'Cart', products, showProducts: products.length, totalPrice})
  });
};

const deleteFromCart = (req, res) => {
  Cart.removeCartItem(req.params.productId);
  res.redirect('/cart');
};

const createOrder = (req, res) => {
  const ids = Cart.getCartItemIds();
  const order = Order.instance;
  const {user: User} = req;

  const cartItems = ids.map((prodId) => {
    const quantity = Cart.getQuantityByItemId(prodId);
    return {productId: +prodId, quantity, userId: User.id}
  });

  order.bulkCreate(cartItems).then(() => {
    return order.findAll();
  }).then(orders => {
    console.log('ORDER', JSON.stringify(orders));
    res.redirect('/order');
  }).catch(handleError);

};

module.exports = {
  getShop,
  getProductDetails,
  getCart,
  addToCart,
  deleteFromCart,
  createOrder
};
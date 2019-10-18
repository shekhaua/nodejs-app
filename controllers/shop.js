const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

const renderShop = (req, res/*, next*/) => {
  Product.read().then((products) => {
    res.render('shop/index', {docTitle: 'Shop', products, showProducts: products.length});
  })
};

const renderProductDetails = (req, res) => {
  Product.read(req.params.productId).then((product) => {
    res.render('shop/product-details', {docTitle: 'Product details', products:[product], showProducts: !!product})
  });
};

const addToCart = (req, res) => {
  Cart.addCartItem(req.params.productId);
  res.redirect('/cart');
};

const getCartItems = () => {
  let ids = Cart.getCartItemIds();
  return Product.read(ids).then((products) => {
    let totalPrice = 0;
    const cartItems = products.map((prod) => {
      prod.quantity = Cart.getQuantityByItemId(prod._id.toString());
      prod.priceSumm = prod.quantity * +(prod.price);
      totalPrice += prod.priceSumm;
      return prod;
    });
    return {cartItems, totalPrice}
  });
};

const renderCart = (req, res) => {
  getCartItems().then(({cartItems, totalPrice}) => {
    res.render('shop/cart', {docTitle: 'Cart', products: cartItems, showProducts: cartItems.length, totalPrice})
  });
};

const deleteFromCart = (req, res) => {
  Cart.removeCartItem(req.params.productId);
  res.redirect('/cart');
};

const createOrder = (req, res) => {
  getCartItems().then(({cartItems}) => {
    const order = new Order(cartItems, req.user._id);
    order.create().then((resp) => {
      Cart.clear();
      res.render('shop/order-success', {orderId: resp.insertedId});
    });
  });
};

module.exports = {
  renderShop,
  renderProductDetails,
  renderCart,
  addToCart,
  deleteFromCart,
  createOrder
};
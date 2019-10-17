const {getDb, fetchCollectionItems} = require('../utils/database');
const {logSuccess, handleError } = require('../utils/response-handlers');

class Order {
  constructor(cartItems) {
    this.cartItems = cartItems;
    this.totalPrice = this.constructor.getTotalPrice(cartItems);
  }

  static getTotalPrice(cartItems = []) {
    return cartItems.reduce((prevValue, currentVal) => {
      return prevValue + currentVal.price * currentVal.quantity;
    }, 0);
  }

  create() {
    return getDb().collection('orders').insertOne(this).then(logSuccess('Create order', 'ops')).catch(handleError);
  }

  static read(id) {
    return fetchCollectionItems('orders', id);
  }

  static update() {

  }

  static del() {

  }
}

module.exports = Order;
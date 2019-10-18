const {ObjectId} = require('mongodb');
const {getDb, fetchCollectionItems} = require('../utils/database');
const {logSuccess, handleError } = require('../utils/response-handlers');

class Order {
  constructor(cartItems, userId) {
    this.cartItems = cartItems;
    this.totalPrice = this.constructor.getTotalPrice(cartItems);
    this.userId = userId;
  }

  static getTotalPrice(cartItems = []) {
    return cartItems.reduce((prevValue, currentVal) => {
      return prevValue + currentVal.price * currentVal.quantity;
    }, 0);
  }

  create() {
    const db = getDb();
    const {userId, ...cartInfo} = this;
    return db.collection('users').findOne({_id: new ObjectId(this.userId)}).then((user) => {
      return db.collection('orders').insertOne({...cartInfo, user});
    }).then(logSuccess('Create order', 'ops')).catch(handleError);
  }

  static read(id) {
    return fetchCollectionItems('orders', id);
  }

  update() {

  }

  static del() {

  }
}

module.exports = Order;
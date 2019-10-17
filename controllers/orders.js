const Order = require('../models/order');

const renderOrders = (req, res) => {
  return Order.read().then((orders) => {
    res.render('admin/orders', {docTitle: 'Orders overview', action: 'Orders', orders})
  });
};

module.exports = {
  renderOrders
};
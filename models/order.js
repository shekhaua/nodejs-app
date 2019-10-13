const {Model, DataTypes} = require('sequelize');
const sequelize = require('../utils/mysql-database');
const {logSuccess, handleError } = require('../utils/response-handlers');

class Order extends Model{}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    allowNull: false,
    primaryKey: true
  },
}, {sequelize, modelName: 'order'});

function create(order) {
  Order.create(order).then(logSuccess).catch(handleError);
}

function read() {

}

function update() {

}

function del() {

}

module.exports = {
  instance: Order,
  create,
  read,
  update,
  del
};
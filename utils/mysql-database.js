const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs_training', 'root', 'rootMyRoot',
  {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;
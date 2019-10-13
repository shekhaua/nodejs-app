const {Model, DataTypes} = require('sequelize');
const sequelize = require('../utils/mysql-database');
const {logSuccess, handleError } = require('../utils/response-handlers');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: DataTypes.STRING,
  username: DataTypes.STRING,
  email: DataTypes.STRING,
}, { sequelize, modelName: 'user'});

function create (user) {
  User.create(user).then(logSuccess).catch(handleError);
}

function read () {

}

function update() {

}

function del() {

}

module.exports = {
  instance: User,
  create,
  read,
  update,
  del
};
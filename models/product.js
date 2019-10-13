const {Model, DataTypes, Op} = require('sequelize');
const sequelize = require('../utils/mysql-database');
const {logSuccess, handleError } = require('../utils/response-handlers');

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: DataTypes.STRING,
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'product'});

function create(product) {
  return Product.create(product).then(logSuccess()).catch(handleError);
}
/*
* Reads single product
* Reads All products
* Reads, multiple products by array of ids
* */
function read (id) {
  if(Array.isArray(id)) {
    if (!id.length) { return Promise.resolve([]); }

    return Product.findAll({ where: {
      id: { [Op.or]: id }
    }}).then(logSuccess(`Products ${JSON.stringify(id)} fetched`)).then((resp) => {
      return resp;
    }).catch(handleError);
  }
  if (id) {
    return Product.findByPk(id).then(logSuccess(`Products ${id} fetched`)).catch(handleError);
  }
  return Product.findAll().then(logSuccess('Products fetch all')).catch(handleError);
}

function update(product) {
  return Product.update(product, { where:
      { id: product.id }
  }).then(logSuccess(`Product ${product.id} updated`)).catch(handleError);
}

function del(id) {
  return Product.destroy({ where:
      { id: id }
  }).then(logSuccess(`Product ${id} deleted`)).catch(handleError);
}

module.exports = {
  instance: Product,
  create,
  read,
  update,
  del
};

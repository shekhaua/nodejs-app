const {ObjectId} = require('mongodb');
const {getDb, fetchCollectionItems} = require('../utils/database');
const {logSuccess, handleError } = require('../utils/response-handlers');

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  create () {
    const db = getDb();
    return db.collection('products').insertOne(this).then(logSuccess).catch(handleError);
  }
  /*
  * Reads single product
  * Reads All products
  * Reads, multiple products by array of ids
  * */
  static read (id) {
    return fetchCollectionItems('products', id);
  }

  static update(product) {
    const db = getDb();
    const {id} = product;
    delete product.id;
    return db.collection('products').updateOne({_id: new ObjectId(id)},{$set: product})
      .then(logSuccess(`Product ${id} updated`)).catch(handleError);
  }

  static del(id) {
    const db = getDb();
    return db.collection('products').deleteOne({_id: new ObjectId(id)})
      .then(logSuccess(`Product ${id} deleted`)).catch(handleError);
  }
}

module.exports = Product;
const {ObjectId} = require('mongodb');
const {getDb, fetchCollectionItems} = require('../utils/database');
const {logSuccess, handleError } = require('../utils/response-handlers');

class Product {
  constructor(id, title, price, imageUrl, description) {
    this._id = id? new ObjectId(id): null;
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

  update() {
    const db = getDb();
    return db.collection('products').updateOne({_id: this._id}, {$set: this})
      .then(logSuccess(`Product ${id} updated`, 'result')).catch(handleError);
  }

  static del(id) {
    const db = getDb();
    return db.collection('products').deleteOne({_id: new ObjectId(id)})
      .then(logSuccess(`Product ${id} deleted`)).catch(handleError);
  }
}

module.exports = Product;
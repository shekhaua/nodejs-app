const {ObjectId} = require('mongodb');
const {getDb, fetchCollectionItems} = require('../utils/database');
const {logSuccess, handleError } = require('../utils/response-handlers');

class User {
  constructor(id, name, userName, email ) {
    this._id = id? new ObjectId(id) : null;
    this.name = name;
    this.userName = userName;
    this.email = email;
  }

  create() {
    const db = getDb();
    return db.collection('users').insertOne(this).then(logSuccess('User create')).catch(handleError);
  }

  static read(id) {
    return fetchCollectionItems('users', id).then(logSuccess('User fetch'), handleError)
  }

  update() {

  }

  del() {}
}

module.exports = User;
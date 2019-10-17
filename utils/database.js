const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://nodejs:MeoAETjKTOLtxfOV@cluster0-m33aj.mongodb.net/nodejs-app?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const {logSuccess, handleError } = require('../utils/response-handlers');

let _db;

client.connect(err => {
  _db = client.db("nodejs-app");
  //const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  //client.close();
});

function getDb() {
  return _db;
}

function fetchCollectionItems(collectionName, id) {
  const db = getDb();

  if(Array.isArray(id)) {
    if (!id.length) { return Promise.resolve([]); }

    return new Promise((resolve, reject) => {
      const ids = id.map((i => {
        return new ObjectId(i);
      }));
      const cursor = db.collection(collectionName).find({_id: { $in: ids }});
      const items = cursor.toArray();
      resolve(items);
    }).then(logSuccess(`${collectionName} ${JSON.stringify(id)} fetched`)).catch(handleError);

  }
  if (id) {
    return db.collection(collectionName).findOne({_id: new ObjectId(id)})
      .then(logSuccess(`${collectionName} fetch by id`)).catch(handleError);
  }

  return new Promise((resolve, reject) => {
    const cursor = db.collection(collectionName).find({});
    const items = cursor.toArray();
    resolve(items);

  }).then(logSuccess(`${collectionName} fetch all`)).catch(handleError);
}

module.exports.getDb = getDb;
module.exports.fetchCollectionItems = fetchCollectionItems;
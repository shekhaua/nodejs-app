const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');
const pathToProducts = path.join(rootDir, 'data', 'products.json');

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    let products = [];
    // read stored products
    this.constructor.fetchAll().then((products) => {
      // store product
      products.push(this);
      // update products file
      fs.writeFile(pathToProducts, JSON.stringify(products), (error) => {
        if(!error) {
          console.log('Product saved');
          return;
        }
        console.log('Error while saving product');
      });
    });
  }

  static fetchAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToProducts, (error, fileContent) => {
        if(!error) {
          resolve(JSON.parse(fileContent));
          return;
        }
        resolve([])
      });
    });
  }
};
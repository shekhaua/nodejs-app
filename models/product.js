const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');
const pathToProducts = path.join(rootDir, 'data', 'products.json');

function writeToFile(products) {
  fs.writeFile(pathToProducts, JSON.stringify(products), (error) => {
    if(!error) {
      console.log('Products updated');
      return;
    }
    console.log('Error while updating products');
  });
}

module.exports = class Product {
  constructor(id = null, title, description, imageUrl, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
    // read stored products
    return this.constructor.fetchAll().then((products) => {
      // store product
      this.id = Math.random().toString();
      products.push(this);
      // update products file
      writeToFile(products);
    });
  }

  update(){
    // read stored products
    return this.constructor.fetchAll().then((products) => {
      const idx = products.findIndex(p => p.id === this.id);
      // store product
      products[idx] = this;
      // update products file
      writeToFile(products);
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

  static fetchProductsByIds(ids) {
    return this.fetchAll().then((products) => {
      return products.filter((p) => {
        return (ids.findIndex(id => id === p.id) >= 0);
      });
    });
  }

  static fetchProductById(id) {
    return this.fetchProductsByIds([id]);
  }

  static deleteProduct(id) {
    return this.fetchAll().then((products) => {
      const idx = products.findIndex(p => p.id === id);
      products.splice(idx, 1);
      writeToFile(products);
    });
  }
};
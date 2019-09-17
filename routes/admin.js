const express = require('express');
//const path = require('path');

const router = express.Router();
//const rootDir = require('../utils/path');

const products = [];

router.get('/add-product', (req, res/*, next*/) => {
  //res.sendFile(path.join(rootDir, 'views', 'add-product.html')); // static html
  //res.render('pug_add-product', {docTitle: 'Add product - Pug', products}); // pug based html
  res.render('ejs_add-product', {docTitle: 'Add product - Ejs', products, showProducts: products.length}); // handlebars based html
});

router.post('/product', (req, res/*, next*/) => {
  if(req.body.title) {
    products.push({title: req.body.title});
  }
  res.redirect('/admin/add-product');
});

module.exports.router = router;
module.exports.products = products;
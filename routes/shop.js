const express = require('express');
//const path = require('path');

const router = express.Router();
//const rootDir = require('../utils/path');

const admin = require('./admin');

router.get('/', (req, res/*, next*/) => {
  console.log('SHOP PRODUCTS', admin.products);
  const {products} = admin;
  //res.sendFile(path.join(rootDir, 'views', 'shop.html')); // static html
  //res.render('pug_shop', {docTitle: 'Shop - pug', products}); // pug based template
  //res.render('hbs_shop', {docTitle: 'Shop - handlebars', products, showProducts: products.length}); // handlebars based template
  res.render('ejs_shop', {docTitle: 'Shop - ejs', products, showProducts: products.length}); // handlebars based template
});

module.exports = router;
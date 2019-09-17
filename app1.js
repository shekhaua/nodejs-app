const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', (req, res, next) => {
  console.log('>>>> THIS ALWAYS RUNS');
  next();
});

app.use('/add-product', (req, res, next) => {
  console.log('ADD PRODUCT');
  res.send("<form action='/product' method='POST'><input type='text' name='title'/> <button type='submit'>Submit</button></form>")
});

app.post('/product', (req, res, next) => {
  console.log('PPRODUCT', req.body);
  res.redirect('/add-product');
});

app.use('/', (req, res, next) => {
  console.log('HOME');
  next()
});

app.use((req, res, next) => {
  console.log('FIRST MIDDLEWARE');
  next();
});

app.use((req, res, next) => {
  console.log('<<<< SECOND MIDDLEWARE');
  res.send('<div>I am xpress app</div>')
});

app.listen(3001);
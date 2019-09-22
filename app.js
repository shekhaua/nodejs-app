const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('express-handlebars');

// routes
const admin = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// controllers
const {getPageNotFound} = require('./controllers/page-not-found');

//app configuration
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.engine('hbs', handlebars({
  layoutsDir: 'views/layouts',
  defaultLayout: "page-layout",
  extname: 'hbs'
}));

// Handlebars templates
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

// routes configuration
app.use('/admin', admin.router);
app.use(shopRoutes);
app.use('/', getPageNotFound);

// start server
app.listen(3001);

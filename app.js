const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const admin = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const {getPageNotFound} = require('./controllers/page-not-found');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
/*app.engine('hbs', handlebars({
  layoutsDir: 'views/layouts',
  defaultLayout: "hbs_page-layout",
  extname: 'hbs'
}));*/
//Pug templates
//app.set('view engine', 'pug');

// Handlebars templates
//app.set('view engine', 'hbs');

// ejs template
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', admin.router);
app.use(shopRoutes);
app.use('/', getPageNotFound);

app.listen(3001);

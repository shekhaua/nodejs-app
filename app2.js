const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('express-handlebars');

const admin = require('./routes/admin');
const shopRoutes = require('./routes/shop');

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
app.use('/', (rew, res) => {
  //res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); // static files
  //res.status(404).render('pug_404', {docTitle: 'Page not found'}); // pug based html
  //res.status(404).render('hbs_404', {docTitle: 'Page not found'}); // handlebars based html
  res.status(404).render('ejs_404', {docTitle: 'Page not found'}); // ejs based html
});

app.listen(3001);

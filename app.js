const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('express-handlebars');
const {handleError} = require('./utils/response-handlers');
const sequelize = require('./utils/mysql-database');
const methodOverride = require('method-override');

// routes
const adminRoutes = require('./routes/admin');
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

/**
 * Middleware that detects a HTTP method tunneled,
 * inside the request body of another HTTP method. Detects
 * and routs to the method mentioned in the body.
 */
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method
  }
}));

// Handlebars templates
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

// user handling
app.use((req, res, next) => {
  user.findByPk(1).then((usr) => {
    req.user = usr;
    next();
  }).catch(handleError);
});

// routes configuration
app.use(adminRoutes);
app.use(shopRoutes);
app.use('/', getPageNotFound);

// initialize database
const Product  = require('./models/product');
const User = require('./models/user');
const Order = require('./models/order');

const {instance: product} = Product;
const {instance: user} = User;
const {instance: order} = Order;

product.belongsTo(user, {constraints: true, onDelete: 'CASCADE', as: 'creator' });
user.hasMany(product, {foreignKey: 'creatorId'});

product.belongsToMany(user, {through: order});
user.belongsToMany(product, {through: order});


sequelize.sync(/*{force: true}*/).then(() => {
  return user.findByPk(1).then((usr) => {
    if(!usr) {
      return user.create({name: 'Andrei Shekhau', username: 'Ander', email: 'test@test.com'})
    } else {
      return usr;
    }
  });
}).then(() => {
  // start server
  app.listen(3001);
}).catch(handleError);


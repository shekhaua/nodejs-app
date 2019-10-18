const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('express-handlebars');
const {handleError} = require('./utils/response-handlers');
const methodOverride = require('method-override');
const User = require('./models/user');


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
app.use((req, res, next) => {
  User.read().then((users) => {
    if(!users.length) {
      const user = new User(null, 'Andrei', 'Ander', 'andrei.shekhau@gmail.com');
      return user.create().then((result) => {
        const userId = result.insertedId.toString();
        return User.read(userId);
      });
    }
    return users[0];
  }).then((user) => {
    req.user = user;
    next();
  });
});

// routes configuration
app.use(adminRoutes);
app.use(shopRoutes);
app.use('/', getPageNotFound);

// start server
app.listen(3001);

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession');
const swag_c = require('./controllers/swag_controller');
const auth_c = require('./controllers/auth_controller');
const cart_c = require('./controllers/cart_controller');
const search_c = require('./controllers/search_controller');

const app = express();
app.use( bodyParser.json() );
app.use( session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    working: true
  }
}) );

// middleware
app.use( checkForSession );
app.use( express.static(`${__dirname}/build`) );

// swag_controller
app.get('/api/swag', swag_c.read);
// auth_controller
app.post('/api/login', auth_c.login);
app.post('/api/register', auth_c.register);
app.post('/api/signout', auth_c.signout);
app.get('/api/user', auth_c.getUser);
// cart_controller
app.post('/api/cart', cart_c.add);
app.post('/api/cart/checkout', cart_c.checkout);
app.delete('/api/cart', cart_c.delete);
// search_controller
app.get('/api/search/', search_c.search);

/*
Create the following endpoints: ( request method, url, controller method )
Test your endpoints using postman.
Try adding an item to the cart by id ( 1 - 35 ).
Try remove an item from the cart by id ( 1 - 35 ).
Try checking out.
 */

const port = process.env.PORT || 3000;
app.listen( port, () => console.log(`Server listening on port ${port}`) );
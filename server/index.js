const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession');
const sc = require('./controllers/swag_controller');
const ac = require('./controllers/auth_controller');

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

// endpoints
app.get('/api/swag', sc.read);
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);

/**
Test your endpoints using postman.
Try registering a new user.
Try logging in with that user.
Try getting the session's information on the user ( /api/user ).
Try signing out ( This should return nothing if the session was destroyed ).
 */

const port = process.env.PORT || 3000;
app.listen( port, () => console.log(`Server listening on port ${port}`) );
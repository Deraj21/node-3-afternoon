const users = require('../models/users'); // { id: integer, username: string, password: string }
let id = 1;

module.exports = {
  login: (req, res, next) => {
    let { username, password } = req.body;
    let currentUser = users.filter(user => (user.username === username && user.password === password) )[0];
    if (currentUser){
      req.session.user.username = currentUser.username;
      res.status(200).send(currentUser);
    }
    else{
      console.log('login FAILED');
      res.status(500);
    }
    
  },
  register: (req, res, next) => {
    let { username, password } = req.body;
    users.push({ username, password });
    id++;
    req.session.user.username = username;
    res.status(200).send(req.user);
  },
  signout: (req, res, next) => {
    let { user } = req.session;
    req.session.destroy();
    res.status(200).send(user);
  },
  getUser: (req, res, next) => {
    res.status(200).send(req.session.user);
  }
}

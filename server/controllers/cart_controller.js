const swag = require('../models/swag');

module.exports = {
  add: (req, res, next) => {
    let { user } = req.session;
    let { cart, total } = user;
    let { id } = req.query;
    let isInCart = cart.find(item => item.id === parseInt(id));

    if (isInCart){
      res.status(200).send(user);
    }
    else {
      let item = swag.find(item => item.id === parseInt(id));
      cart.push(item);
      total += item.price;
      res.status(200).send(user);
    }
  },
  delete: (req, res, next) => {
    let { user } = req.session;
    let { cart, total } = user;
    let { id } = req.query;
    let item = cart.find(item => item.id === parseInt(id));
    let index = cart.indexOf( item );
    console.log(`item: ${item}, index: ${index}`);

    cart.splice(index, 1);
    total -= item.price;

    res.status(200).send(user);
  },
  checkout: (req, res, next) => {
    let { user } = req.session;

    user.cart = [];
    user.total = 0;
    
    res.status(200).send(user);
  },
}

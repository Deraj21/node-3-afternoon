const swag = require('../models/swag');

module.exports = {
  search: (req, res, next) => {
    let { category } = req.query;
    let items = swag.filter(item => item.category === category );
    if (items.length <= 0){
      items = [...swag];
    }
    res.status(200).send(items);
  }
}
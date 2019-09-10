var express = require('express');
var router = express.Router();
var db = require('../db');

const { Order } = require('../models/ordentary');
const bcrypt = require('bcryptjs');


router.post('/setOrder', async (req, res) => {
  order = new Order(req.body);
  await order.save();
  return res.send({
      message: 'order Save'
  });
})

  //get all orders
  router.get('/getAllOrders', async(req,res,next) => {
      let array = [];
      array = (await Order.find());
        return res.json(array);
    })
module.exports = router;
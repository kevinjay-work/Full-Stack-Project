const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { privateKey } = require('../config/default');

const ordentarySchema = mongoose.Schema({
    starRating: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    },
    comment: {
        type: String
    }
})


const Order = mongoose.model('Order', ordentarySchema, 'orders');

exports.Order = Order;

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { privateKey } = require('../config/default');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        required: true
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, privateKey);
    return token;
}

const User = mongoose.model('User', userSchema, 'users');

exports.User = User;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playerApp', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err.message);
    }else{
        console.log('Successfully connected to mongodb');
    }
});

mongoose.set('useCreateIndex', true);

module.exports = mongoose;
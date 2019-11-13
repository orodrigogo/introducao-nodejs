const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/prafazer', {useNewUrlParser: true})

module.exports = mongoose;
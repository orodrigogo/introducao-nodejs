const mongoose = require('mongoose');

/*
  Docs do Warnings de Depreciação: https://mongoosejs.com/docs/deprecations.html
*/
mongoose.connect('mongodb://localhost/prafazer', {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = { 
  mongo: mongoose.connection, 
  ObjectId: mongoose.Types.ObjectId 
}
const mongoose = require('mongoose')

const { reqString, reqNumber, reqBoolean, reqArray } = require('./zschema_template')


// O ID deve ser <ID da Guild><ID do autor>, visto que, por exemplo, a data, muda conforme a guild muda
const newUser = mongoose.Schema({
  // id of the alert
  _id: reqString,   
  // users using the alert
  users: reqArray,
  // Descrição dele
  description: reqString,

})

module.exports = mongoose.model('alerts', newUser)
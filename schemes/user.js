const mongoose = require('mongoose')

const { reqString, reqNumber, reqBoolean, reqArray } = require('./zschema_template')


// O ID deve ser <ID da Guild><ID do autor>, visto que, por exemplo, a data, muda conforme a guild muda
const newUser = mongoose.Schema({
  _id: reqString,   
  coins:reqNumber,
  points: {
    rightQuizAnswers: reqNumber,
    bruteExp: reqNumber,
    exp: reqNumber,
    name: reqString
  },
  dateArrived: reqString,
  words: reqNumber,
})

module.exports = mongoose.model('user', newUser)
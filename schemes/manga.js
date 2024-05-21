const mongoose = require('mongoose')

const { reqString, reqNumber, reqBoolean, reqArray } = require('./zschema_template')


// O ID deve ser <ID da Guild><ID do autor>, visto que, por exemplo, a data, muda conforme a guild muda
const MangaCount = mongoose.Schema({
  count: reqNumber
})

module.exports = mongoose.model('manga', MangaCount)
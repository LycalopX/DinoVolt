const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const reqNumber = {
    type: Number,
    required: true
}
const reqBoolean = {
    type: Boolean,
    required: true
}
const reqArray = {
    type: Array,
    required: true
}
const reqDate = {
    type: Date,
    required: true
}

module.exports = { reqString, reqNumber, reqBoolean, reqArray, mongoose, reqDate }
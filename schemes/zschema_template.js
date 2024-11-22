const mongoose = require('mongoose')

module.exports = {
    reqString: {
        type: String,
        required: true
    },
    typeString: {
        type: String,
        required: false
    },
    reqNumber: {
        type: Number,
        required: true
    },
    typeNumber: {
        type: Number,
        required: false
    },
    reqBoolean: {
        type: Boolean,
        required: true
    },
    typeBoolean: {
        type: Boolean,
        required: false
    },
    reqArray: {
        type: Array,
        required: true
    },
    typeArray: {
        type: Array,
        required: false
    },
    reqDate: {
        type: Date,
        required: true
    },
    typeDate: {
        type: Date,
        required: false
    }
}
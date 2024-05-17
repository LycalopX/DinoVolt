const mongoose = require('mongoose')
const important_shit = require('./important_shit.json')

var t = ""


module.exports = async () => {

    // Heroku dependancy
    if (process.env.TOKEN) {
        t += process.env.mongoPath
    } else {
    }

    var mongoPath = process.env.mongoPath || important_shit.mongoPath
    await mongoose.connect(mongoPath)

    return mongoose
}
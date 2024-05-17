const mongoose = require('mongoose')



module.exports = async () => {

    mongopath = ""

    // Heroku dependancy
    if (process.env.mongoPath) {
        mongopath += process.env.mongoPath
    } else {
        var important = require("./important_shit.json");

        mongopath += important.token
    }




    // Variables by storage
    const mongoPath = process.env.mongoPath || important.mongoPath

    await mongoose.connect(mongoPath)

    return mongoose
}
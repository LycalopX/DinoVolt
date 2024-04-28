
// Actual requirements
const fs = require('fs')
const Discord = require("discord.js");
const fcs = require("./functions.js");

var folderPath = "./events/commands";
var commandFolders = fs.readdirSync(folderPath);



for (const folder of commandFolders) {

    var commandFiles = fs.readdirSync(`${folderPath}/${folder}`).filter(file => file.endsWith(".js"))

    for (file of commandFiles) {

        var commands = require(`${folderPath}/${folder}/${file}`)


    }
}

module.exports = { commands }
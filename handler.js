
// Actual requirements
const fs = require('fs')
const Discord = require("discord.js");
const fcs = require("./functions.js");

var folderPath = "./commands";
var commandFolders = fs.readdirSync(folderPath);

const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds] });

client.commands = new Discord.Collection();
const commands = []

async function commandHandler() {

    for (const folder of commandFolders) {

        var commandFiles = fs.readdirSync(`${folderPath}/${folder}`).filter(file => file.endsWith(".js"))

        for (file of commandFiles) {

            var command = require(`${folderPath}/${folder}/${file}`)

            if ('data' in command && 'execute' in command) {

                client.commands.set(command.data.name, command)
                commands.push(command.data.toJSON());

            } else {
                console.log(`[Aviso] O comando em ${folderPath}/${folder}/${file} está faltando os parâmetros "data" ou "execute", que são básicos para sua execução.`);
            }

        }
    }

    return commands
}

module.exports = { commandHandler }
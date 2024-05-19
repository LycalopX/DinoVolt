
// Actual requirements
const fs = require('fs')
const Discord = require("discord.js");
const fcs = require("./functions.js");

var folderPath = "./commands";
var commandFolders = fs.readdirSync(folderPath);

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildMessageReactions
    ]
});

const commands = []

async function commandHandler() {
    client.commands = new Discord.Collection();

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


    // Lidando com os eventos
    var eventsPath = "./events";
    var eventFiles = fs.readdirSync(`./${eventsPath}`).filter(file => file.endsWith(".js"))

    for (const file of eventFiles) {
        const filePath = `${eventsPath}/${file}`
        const event = require(filePath);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args), client);
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }

    return commands;
}

module.exports = { commandHandler, client }


// Actual requirements
const fs = require('fs')
const Discord = require("discord.js");
const fcs = require("./functions.js");



// Constants
const important = require("./important_shit.json");
const { sourceMapsEnabled } = require('process');


// Variables by storage
const TOKEN = important.token
const CLIENT_ID = important.client_id


// O cliente do bot
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds] });
const { commands } = require('./handler.js')


// Important things

const rest = new Discord.REST({ version: '10' }).setToken(TOKEN);

async function trying() {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Discord.Routes.applicationCommands(CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

trying();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('HAHAHA SUA MAE SUA MAEEEEE HAHAHAH!');
    }
});

client.login(TOKEN);




// BOT RESETS UPDATER
fs.readFile('./storage/data.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log("bruh\n");

        console.log(err);
    }
    else {
        // Turning to object
        var soul = JSON.parse(data);

        soul.resets++
        soul = JSON.stringify(soul)

        fs.writeFileSync('./storage/data.json', soul);
    }
});



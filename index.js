
// Actual requirements
const fs = require('fs')
const Discord = require("discord.js");
const fcs = require("./functions.js");



// Constants
const important = require("./important_shit.json");


// Variables by storage
const TOKEN = important.token
const CLIENT_ID = important.client_id


// O cliente do bot
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds] });

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

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
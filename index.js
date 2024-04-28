import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require('fs')


// Importar algumas constantes
import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';
const important = require("./important_shit.json");



const TOKEN = important.token


// O cliente do bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

// Important things
const CLIENT_ID = "1234006524133642300";

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}


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
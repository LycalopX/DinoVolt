const Discord = require('discord.js');

// Command
module.exports = {
	data: new Discord.SlashCommandBuilder()

		.setName("")
		.setDescription(''),

	async execute(interaction) {
        // Whatever
	},
};

// Event
const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
const Discord = require('discord.js');

// Command
module.exports = {
	data: new Discord.SlashCommandBuilder()

		.setName("")
		.setDescription('')

		.addStringOption(option =>
			option
				.setName('')
				.setDescription('')),

	async execute(interaction) {
        // Whatever
	},
};

// Event
const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(argument, client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		
		const reason = interaction.options.getString('reason')
	},
};
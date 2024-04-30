const Discord = require('discord.js');

// Command
module.exports = {
	data: new Discord.SlashCommandBuilder()

		.setName("stop")
		.setDescription('Stops the command, havent been able to deal with this more'),

	async execute(interaction) {
        interaction.reply("bruh")
	},
};
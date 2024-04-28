const Discord = require('discord.js');

module.exports = {
	data: new Discord.SlashCommandBuilder()

		.setName("coinflip")
		.setDescription('flips a coin!'),

	async execute(interaction) {
        interaction.reply("coin flip!")
	},
};
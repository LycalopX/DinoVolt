const Discord = require('discord.js');
const Distube = require('distube');

module.exports = {
	data: new Discord.SlashCommandBuilder()

		.setName("play")
		.setDescription('Toca uma música no seu canal do discord.'),

	async execute(interaction) {
        interaction.reply("yea, we still workin on dis")


	},
};
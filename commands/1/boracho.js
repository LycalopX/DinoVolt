const Discord = require('discord.js');

module.exports = {
	data: new Discord.SlashCommandBuilder()

		.setName("boracho")
		.setDescription('El boracho'),

	async execute(interaction) {
        interaction.reply("https://www.youtube.com/watch?v=Es0wz5-tzjg")
	},
};
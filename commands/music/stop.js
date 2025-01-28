const Discord = require('discord.js');
const fcs = require('../../functions');

// Command
module.exports = {
	data: new Discord.SlashCommandBuilder()

		.setName("stop")
		.setDescription('Stops the command, havent been able to deal with this more'),

		category: "music",

	async execute(interaction, client) {
		
		var EmbedErr = await fcs.embed("FF0000", "Não tem nada na *queue* no momento!")
		var EmbedStop = await fcs.embed("FF0000", "Parou!")
		
		// Need to change it 
		const queue = ["penis", "dick"];

		if (!queue)  {
			return interaction.reply({ embeds: [ EmbedErr ]})
		}

		queue.stop()
		interaction.reply({ embeds: [ EmbedStop ]})

	},
};
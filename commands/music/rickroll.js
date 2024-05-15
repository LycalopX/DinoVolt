const Discord = require('discord.js');
const fcs = require('../../functions.js')


// COMMANDS
module.exports = {
	data: new Discord.SlashCommandBuilder()

		.setName("rickroll")
		.setDescription('Dá um rickroll na pessoa'),

	async execute(interaction, client) {

		const userMusic = "rickroll"
		const userVoiceChannel = interaction.member.voice.channel;
        
		try {
			client.distube
				.play(userVoiceChannel, userMusic, {
					interaction,
					textChannel: interaction.channel,
					member: interaction.member,
				})
				.catch(err => {
					interaction.reply(err.message)
				})

			const Embed = await fcs.embed(null, null, null, null, `Pedido por ${interaction.member} aceito.`)
			
			interaction.reply({ embeds: [ Embed ] })

		} catch (e) {

			// Handling errors
			if (!userVoiceChannel) {
				interaction.reply("Você precisa estar em um canal de música para funcionar, sabia?")
			}


			console.log(e)
			interaction.reply("Ok, parece que ele não conseguiu rodar a música. Mais sorte da próxima!")
		}
	},
};
const Discord = require('discord.js');

module.exports = {
	data: new Discord.SlashCommandBuilder()

		.setName("play")
		.setDescription('Toca uma música no seu canal do discord.')

		.addStringOption(option =>
			option
				.setName('music')
				.setDescription('Qual música você quer que o bot toque! (Pode ser um URL)')),

	async execute(interaction, client) {

		const DisTube = require('distube')
		
		const distube = new DisTube.default(client)



		const userMusic = interaction.options.getString('music')
		const userVoiceChannel = interaction.member.voice.channel;

		console.log(distube)
		

		try {
			distube
			.play(userVoiceChannel, userMusic, {
				interaction,
				textChannel: interaction.channel,
				member: interaction.member,
			})
			.catch(err => {
				interaction.reply(err.message)
			})
	
			interaction.reply(`Agora tocando: ${userMusic}`)

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
const Discord = require('discord.js');
const fcs = require('../../functions.js')
const ytsr = require("@distube/ytsr");

module.exports = {
	data: new Discord.SlashCommandBuilder()

		.setName("play")
		.setDescription('Toca uma música no seu canal do discord.')

		.addStringOption(option =>
			option
				.setName('music')
				.setDescription('Qual música você quer que o bot toque (Pode ser um URL)')),
	category: "music",

	async execute(interaction, client) {

		const userMusic = interaction.options.getString('music')
		const userVoiceChannel = interaction.member.voice.channel;

		const glitchedcat = client.emojis.cache.get("1234961134868758539");
		const dancinparrot = client.emojis.cache.get("1234961203709874326")


		// Não está em um canal de voz
		if (!userVoiceChannel) {
			return interaction.reply({ embeds: [await fcs.errEmbed("Entre em um canal de voz!", `Sabe, você precisa estar em um canal de voz para eu poder rodar alguma música. Um tanto redundante nn? ${dancinparrot}`)] })
		}

		else if (!userMusic) {
			return interaction.reply({ embeds: [await fcs.errEmbed("Me dê uma música para tocar!", `É, pois é, eu não consigo ler sua mente kkkkkkkkk ${glitchedcat}`)] })
		}


		// Tocando a música
		try {


			var txt = ``;
			var res = {}


			await ytsr(userMusic, { safeSearch: true, limit: 15 }).then(result => {

				for (var i = 0; i < 15; i++) {
					var n = i + 1
					var song = `**${n}.** ${result.items[i].name}\n`

					txt += song
				}

				res = result;
			});


            const tuts = client.emojis.cache.get("1244804188140208240");
			const Embed = await fcs.embed("#9C80E1", `${tuts} Escolha entre as músicas abaixo ${tuts}`, null, null, txt)

			await interaction.reply({ embeds: [Embed] })


			// Coletar música
			const collectorFilter = message => !isNaN(Number(message.content)) && message.author.id != client.user.id;

			const collector = interaction.channel.createMessageCollector({ filter: collectorFilter, time: 60_000 });


			collector.on('collect', async message => {
				var num = Number(message.content) - 1

				if (num < 0 || num > 15 || num % 1 != 0) {
					await interaction.deferReply();
					// Do other async or time-consuming operations
					// and when done:

					return interaction.followUp({ embeds: [await fcs.errEmbed("Essa música não foi dada como opção")] })
				}

				console.log(num)
				console.log(res)
				var song = res.items[num].url

				await client.distube
					.play(userVoiceChannel, song, {
						interaction,
						textChannel: interaction.channel,
						member: interaction.member,
					})
					.catch(err => {
						interaction.reply(err.message)
						return
					})

			});

			collector.on('end', async collected => {
				return interaction.followUp({
					embeds: [await fcs.errEmbed("Demorou demais!", "Sinto muito, para colocar outra música tente novamente!")]
				})
			});



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
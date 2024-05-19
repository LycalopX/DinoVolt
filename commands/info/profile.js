const Discord = require('discord.js');
const fetch = require("node-fetch")

const fcs = require("../../functions")
const { JSDOM } = require('jsdom');



// COMMANDS
module.exports = {
    data: new Discord.SlashCommandBuilder()

        .setName("profile")
        .setDescription('Informa o perfil de um usuário do DinoVolt!')

        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Colocar o usuário cujo nome gostaria de colocar.')),

    async execute(interaction, client) {


        const option = interaction.options.getUser('user')
        var user = ""
        var username = ""
        var globalName = ""



        // Checando se foi colocada uma opção ou não...
        if (option) {
            user = option
            username += user.username
            globalName += user.globalName
        } else {
            user = interaction.member
            globalName += user.user.globalName
            username += user.user.username
        }


        const result = await fcs.findUrl(client, user)



        var txt = `**Rupees**: ${result[0].coins}
**Questões certas do Quiz**: ${result[0].points.rightQuizAnswers}
**xpBruto**: ${result[0].points.bruteExp}
**EXP**: ${result[0].points.exp}

**Primeira mensagem**: ${result[0].dateArrived},
**Número de mensagens enviadas**: ${result[0].words}\n`

        var embed = await fcs.embed("#DFE3EE", `${globalName} - ${username}`, null, null, txt, null, result[0].link)

        interaction.reply({ embeds: [embed] })
    },
};

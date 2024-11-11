const Discord = require('discord.js');
const fcs = require("../../functions");


// COMMANDS
module.exports = {
    data: new Discord.SlashCommandBuilder()

        .setName("timealert")
        .setDescription('Alerta você sobre determinado evento.')

        .addNumberOption(option =>
            option
                .setName('alerta')
                .setDescription('Escolher o número do alerta do qual você quer se inscrever/desinscrever')),

    async execute(interaction, client) {
        // Whatever
        const reason = interaction.options.getNumber('Alerta')
        const alerts = client.cache["alerts"]

        if (!reason) {

            var txt = sendChoices(client);

            const embed = await fcs.embed("#9c80e1", "Alarmes", null, null, txt,)

            await interaction.reply({ embeds: [ embed ]});

        } else {

            if (reason <= 0 || reason % 1 != 0 || reason > alerts.length){
                interaction.reply({ embeds: [ fcs.embed("e18080", "Erro", null, null, "Por favor, escolha entre uma das opções fornecidas. \nSe estiver fazendo tudo corretamente mas ainda der erro, contate LycalopX")]})
            }

            const users = client.cache["alerts"][reason - 1].users;

            console.log(users);

        }
    },
};

async function  sendChoices(client) {
    
    var txt = "Aqui estão os alarmes disponíveis: \n\n";

    var i = 1

    for (noob of alerts) { 

        txt += `${i}. **${noob._id}** \n`
        txt += `${noob.description}\n\n`

        i++
    }

    return txt;
}
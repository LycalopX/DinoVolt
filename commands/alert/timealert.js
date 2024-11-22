const Discord = require('discord.js');
const fcs = require("../../functions");
const user = require('../../schemes/user');
const schema = require("../../schemes/alert")


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
                return;
            }

            const Alert = client.cache["alerts"][reason - 1];
            const users = Alert.users;

            const index = users.find((element) => element == interaction.user.id);

            if (bool) {
                var obj = Alert

                obj.users.splice(index, 1);

                await fcs.updateData(schema, obj);

                interaction.reply({ embeds: [ fcs.embed("e18080", "80e1b1", null, null, `Você foi removido de ${client.cache["alerts"][reason - 1]}. Para se inscrever novamente, rode o comando da mesma forma.`)]})
            } else {
                var obj = Alert

                obj.users.push(interaction)

                await fcs.updateData(schema, obj);
                interaction.reply({ embeds: [ fcs.embed("e18080", "80e1b1", null, null, `Você foi adicionado em ${client.cache["alerts"][reason - 1]}. Para se desinscrever, rode o comando da mesma forma.`)]})
            }

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
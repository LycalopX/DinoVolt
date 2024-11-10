const Discord = require('discord.js');
const fcs = require("../../functions");
const localStorage = require("../../database/data.json")

module.exports = {
    data: new Discord.SlashCommandBuilder()

        .setName("status")
        .setDescription('Envia o status do bot...'),

    async execute(interaction, client) {


        var randomid = Math.floor(Math.random() * 1000000)
        var envcheck = false
        var pfpUrl = (await fcs.findUrl(client, client.user))[0].link

        // Checking if the environment variable is true (heroku is on)
        if (process.env.TOKEN) {
            envcheck = true;
        }

        var structure = 
`Environment 🌿:   ***${envcheck}***,
ID 🏷️:             ***${randomid}***,
Resets:         ***${localStorage.resets}***
LastReset ⌛:      ***${await fcs.beautifulTime(localStorage.lastReset, null, null, null, null, null, null, false, new Date())}***`

        interaction.reply({embeds: [await fcs.embed("#B3EAFC", `🔑 Status do Bot 🔑`, null, null, `${structure}`, null, pfpUrl)] })

    },
};
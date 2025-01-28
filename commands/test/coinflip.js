const Discord = require('discord.js');
const fcs = require("../../functions")

module.exports = {
    data: new Discord.SlashCommandBuilder()

        .setName("coinflip")
        .setDescription('Gira uma moeda'),

    async execute(interaction, args) {

        var n = Math.floor(Math.random() * 2)
        var img = "https://media1.tenor.com/m/kK8D7hQXX5wAAAAd/coins-tails.gif"

        console.log(n)

        if (n == 1) {
            img = "https://media1.tenor.com/m/nEu74vu_sT4AAAAd/heads-coinflip.gif"
        }

        var embed = fcs.embed("FFFF00", "O lado obtido foi:", null, null, null, null, img)

        interaction.reply({embeds: [await embed]})

    },
};
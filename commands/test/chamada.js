const Discord = require('discord.js');
const fcs = require("../../functions");

module.exports = {
    data: new Discord.SlashCommandBuilder()

        .setName("chamada")
        .setDescription('Envia uma chamada do bot...'),

    async execute(interaction) {
        var randomNum = (new Date().getTime()).toString()

        var char = "";

        for (var i = 0; i < randomNum.toString().length; i++) {

            char += String.fromCharCode(randomNum[i] + '0')
        }

        interaction.reply("Olá, eu sou: " + char)

    },
};
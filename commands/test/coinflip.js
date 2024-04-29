const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()

        .setName("coinflip")
        .setDescription('Gira uma moeda'),

    async execute(interaction, args) {

        interaction.reply ("Coinflip ainda nao foi criado KKKK")

    },
};
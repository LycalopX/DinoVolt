const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()

        .setName("rola")
        .setDescription('penis penis penis'),

    async execute(interaction) {

        await interaction.reply("your mom")
    },
};
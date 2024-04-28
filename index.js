
// Actual requirements
const fs = require('fs')
const Discord = require("discord.js");
const fcs = require("./functions.js");


// Constants
const important = require("./important_shit.json");

const { commandHandler, client } = require('./handler.js')


// Variables by storage
const TOKEN = important.token

const CLIENT_ID = important.client_id



// Important things
const rest = new Discord.REST({ version: '10' }).setToken(TOKEN);




(async () => {
    const commands = await commandHandler();

    try {
        console.log('Started refreshing application (/) commands.');
      
        await rest.put(Discord.Routes.applicationCommands(CLIENT_ID), { body: commands });
      
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }

})();






// Ligando o bot!
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});






// EVENTO: Interação
client.on('interactionCreate', async interaction => {



    // Handler de comandos
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        interaction.reply("Oops, parece que não há nenhum comando com esse nome! \nQue tal tentar outro?")

            // After a short while, delete it
            //.then(interaction => {
            //    setTimeout(() => interaction.delete(), 10000)
            //})
            //.catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    }


    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }


});

client.login(TOKEN);




// BOT RESETS UPDATER
fs.readFile('./storage/data.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log("bruh\n");

        console.log(err);
    }
    else {
        // Turning to object
        var soul = JSON.parse(data);

        soul.resets++
        soul = JSON.stringify(soul)

        fs.writeFileSync('./storage/data.json', soul);
    }
});


fcs.meth()

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


// So, we gotta periodically turn the slash command updater off, otherwise, discord does not update commands, like, ever.
const ver = 0;

    (async () => {

        if (ver == 0) {
            await commandHandler();
            console.log("\nNão atualizando comandos slash 🗡️")

        } else {
            const commands = await commandHandler();

            try {
                console.log('\nInicializando os comandos slash 🗡️');

                await rest.put(Discord.Routes.applicationCommands(CLIENT_ID), { body: commands });

                console.log('Recarregou-se com sucesso os comandos do aplicativo.');
            } catch (error) {
                console.error(error);
            }

        }
    })();






// Ligando o bot!
client.on('ready', () => {
    console.log(`Acordando sob comando 💻`);
    console.log(`DinoVolt acorda 🔥`);
});




// EVENTO: Interação
client.on('interactionCreate', async interaction => {


    // Handler de comandos
    if (!interaction.isChatInputCommand()) return;


    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        interaction.reply("Oops, parece que não há nenhum comando com esse nome! \nQue tal tentar outro?")

            // After a short while, delete it
            .then(interaction => {
                setTimeout(() => interaction.delete(), 10000)
            })

            .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);

        return;
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


// EVENTO: Enviar mensagem
client.on('messageCreate', async message => {
})




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
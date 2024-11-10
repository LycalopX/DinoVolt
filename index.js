
// Actual requirements
const Discord = require("discord.js");
const fcs = require("./functions.js");
const mongo = require(`./mongo`)



// Important constants
const { commandHandler, client } = require('./handler.js')
var token = ""; var client_id = ""
client.cache = new Discord.Collection();



// Startup File
const startup = require("./startup.js")




// If it's being hosted using Heroku, the cloud token will be used, otherwise, it uses the local token
if (process.env.TOKEN) {

    token += process.env.TOKEN
    client_id += process.env.CLIENT_ID
} else {

    var important = require("./important_shit.json");

    token += important.token
    client_id += important.client_id
}




// Tokens
const TOKEN = process.env.TOKEN || important.token
const CLIENT_ID = process.env.CLIENT_ID || important.client_id



// Important things
const rest = new Discord.REST({ version: '10' }).setToken(TOKEN);


// So, we gotta periodically turn the slash command updater off, otherwise, discord does not update commands, like, ever.
const ver = 0;

// Connecting to the database, and setting the slah commands
(async () => {

    // MongoDB
    await mongo().then(async mongoose => {
        try {
            console.log('\nConectado ao Mongo! 🌿');

            // sets a local cache for rapid data fetching
            client.cache = await fcs.LoadFullDataBase(mongoose)

            //tries to run code

        }
        finally {
            // will always run
            await mongoose.connection.close()

            fcs.runF(client)
        }
    })


    const commands = await commandHandler();

    // checks for new commands to be registered
    if (ver == 0) {
        commands;
        console.log("Não atualizando comandos slash 🗡️")

    } else {

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
    console.log(
        `\nSilenciosamente 💻
Dinovolt acorda 🔥`);
});




// EVENTO: Interação
client.on('interactionCreate', async interaction => {


    // Handler de comandos
    if (!interaction.isChatInputCommand()) return;


    const command = await interaction.client.commands.get(interaction.commandName);

    if (!command) {
        await interaction.reply("Oops, parece que não há nenhum comando com esse nome! \nQue tal tentar outro?")

            // After a short while, delete it
            .then(interaction => {
                setTimeout(() => interaction.delete(), 10000)
            })

            .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);

        return;
    }


    // if there is a command
    try {
        await command.execute(interaction, client);

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
    const file = require("./events/messageCreate/messageCreate.js");

    file.execute(message, client);
})


client.login(TOKEN);



// Actual requirements
const fs = require('fs')
const Discord = require("discord.js");
const fcs = require("./functions.js");
const mongo = require(`./mongo`)



// Constants
const { commandHandler, client } = require('./handler.js')
var token = ""; var client_id = ""
client.cache = new Discord.Collection();




// Music Player
const { DisTube } = require('distube')
const { YtDlpPlugin } = require('@distube/yt-dlp');

client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new YtDlpPlugin()
    ]
})



// Heroku dependancy
if (process.env.TOKEN) {
    token += process.env.TOKEN
    client_id += process.env.CLIENT_ID
} else {
    var important = require("./important_shit.json");

    token += important.token
    client_id += important.client_id
}




// Variables by storage
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

            client.cache = await LoadFullDataBase(mongoose)
            //tries to run code

        }
        finally {
            // will always run
            await mongoose.connection.close()
        }
    })


    const commands = await commandHandler();

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




// BOT RESETS UPDATER
fs.readFile('./cache/data.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    }
    else {
        // Turning to object
        var soul = JSON.parse(data);

        soul.resets++

        fs.writeFileSync('./cache/data.json', JSON.stringify(soul));
        console.log("Resets: " + soul.resets)
    }
});


// EVENTOS - Distube
(async () => {

    try {
        client.distube
            .on("playSong", async (interaction) => {

                const queue = client.distube.getQueue(interaction)
                const song = queue.songs[0]

                const glitchedcat = client.emojis.cache.get("1234961134868758539");
                const dancinparrot = client.emojis.cache.get("1234961203709874326")

                var embededMessage = await
                    fcs.embed("3364FF", `${glitchedcat} Tocando: ${song.name} - Duração: ${song.formattedDuration} ${glitchedcat}`, null, null,
                        `${dancinparrot} Pedido por: ${song.user} ${dancinparrot}`)

                interaction.textChannel.send({ embeds: [embededMessage] })
            });
    } catch (e) {

        console.log(e)
    }

})();



async function LoadFullDataBase(mongoose) {

    const cache = {};

    const collections = await mongoose.connection.db.listCollections().toArray()

    for (i = 0; i< collections.length; i++) {
        var name = collections[i].name
        documents = await mongoose.connection.db.collection(name).find({}).toArray()

        cache[collections[i].name] = documents
    }

    return cache;

}




fcs.meth()
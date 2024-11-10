
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

            runF(client)
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





async function LoadFullDataBase(mongoose) {

    const cache = {};

    const collections = await mongoose.connection.db.listCollections().toArray()

    for (i = 0; i < collections.length; i++) {
        var name = collections[i].name
        documents = await mongoose.connection.db.collection(name).find({}).toArray()

        cache[collections[i].name] = documents
    }

    return cache;

}

async function runF(client) {

    for (i = 0; i >= 0; i++) {

        const oshinokoUrl = [
            "https://a.storyblok.com/f/178900/2865x4047/501b5563cc/oshi-no-ko-staffel-2-visual.jpeg/m/filters:quality(95)format(webp)",
            "https://preview.redd.it/ojc1mumucfsc1.jpeg?width=640&crop=smart&auto=webp&s=eec8ef46572193d63226eb62bce683286f9fd49a"]

        const csmUrl = [
            "https://static.wikia.nocookie.net/chainsaw-man/images/c/c0/ChainsawManVolume1.jpeg/revision/latest?cb=20210921233305&path-prefix=pt-br",
            "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_2a1p9dt3p13bd0mbhfqg08h067/-S897-FWEBP"]

        const tbateUrl = [
            "https://i.imgur.com/7aPT8MG.jpeg",
            "https://i.imgur.com/zYayXc6.jpeg",
            "https://i.imgur.com/A0WK4oP.jpeg"
        ]

        const opmUrl = [
            "https://static.wikia.nocookie.net/anicrossbr/images/a/a0/Garou%25_27s_featureless_void_face_filled_with_stars_and_galaxies.webp/revision/latest?cb=20220718201019&path-prefix=pt-br"
        ]

        var usersId1 = [
            "444601920791904276",
            "462421774714535937"
        ]
        var usersId2 = [
            "444601920791904276",
        ]

        // Oshi no Ko
        await startup.checkManga("https://readoshino.com/", client, usersId1, oshinokoUrl, "oshi-no-ko-chapter-", "https://readoshino.com/manga/oshi-no-ko-chapter-",
            "NOVO CAPÍTULO - OSHI NO KO", 1);

        // TBATE
        await startup.checkManga("https://thebeginningaftertheendmanga.com/", client, usersId1, tbateUrl, "the-beginning-after-the-end-chapter-", "https://thebeginningaftertheendmanga.com/manga/the-beginning-after-the-end-chapter-",
            "NOVO CAPÍTULO - THE BEGINNING \nAFTER THE END", 3);

        // Chainsaw Man
        await startup.checkManga("https://readchainsaw-man.com/", client, usersId1, csmUrl, "chainsaw-man-chapter-", "https://readchainsaw-man.com/manga/chainsaw-man-chapter",
            "NOVO CAPÍTULO - CHAINSAW MAN", 2);

        // One punch Man
        await startup.checkManga("https://onepunch-man.us/", client, usersId1, opmUrl, "one-punch-man-chapter-", "https://ww5.readopm.com/chapter/one-punch-man-chapter-",
            "NOVO CAPÍTULO - ONE-PUNCH MAN", 4);

        await fcs.sleep(30 * 60 * 1000) // 30 minutos
    }

}


startup.distube(client);
startup.updateResets();

// Actual requirements
const fs = require('fs')
const Discord = require("discord.js");
const fcs = require("./functions.js");
const mongo = require(`./mongo`)
const fetch = require("node-fetch")
const { JSDOM } = require("jsdom")



// Constants
const { commandHandler, client } = require('./handler.js')
var token = ""; var client_id = ""
client.cache = new Discord.Collection();




// Music Player
const { DisTube } = require('distube')
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { count } = require('console');
const user = require('./schemes/user.js');
const manga = require('./schemes/manga.js');

client.distube = new DisTube(client, {
    leaveOnStop: true,
    leaveOnFinish: false,
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




// BOT RESETS UPDATER
fs.readFile('./cache/data.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    }
    else {
        // Turning to object
        var soul = JSON.parse(data);

        soul.resets++
        soul.lastReset = new Date()

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

    for (i = 0; i < collections.length; i++) {
        var name = collections[i].name
        documents = await mongoose.connection.db.collection(name).find({}).toArray()

        cache[collections[i].name] = documents
    }

    return cache;

}

async function checkUrl(url, client) {

    const arrayUrl = ["https://sm.ign.com/ign_br/screenshot/default/capa-jujutsu-kaisen_kfzu.png",
        "https://pop.proddigital.com.br/wp-content/uploads/sites/8/2023/11/01-66.jpg",
        "https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,fit=contain,width=1200,height=675,quality=85/catalog/crunchyroll/8b7f5847f9b97f921e41d4ef59fd2d79.jpe",
        "https://noticiasdeanime.com.br/wp-content/uploads/2024/01/jujutsu-kaisen-manga-vs-anime.webp",
        "https://pbs.twimg.com/media/F-DEr1gXsAERaEL?format=jpg&name=large",
        "https://inbetweendrafts.com/wp-content/uploads/2023/10/IMG_0267.jpeg",
        "https://a.storyblok.com/f/178900/1920x1080/9dcf1a9557/jujutsu-kaisen-s2-still.jpg"]


    const randomUrl = arrayUrl[Math.floor(Math.random() * 7)]



    const mangaScheme = require("./schemes/manga.js")
    var txt = `**Os capítulos mais recentes são:** \n\n`
    var chapter, url;

    await fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Get the response as text (HTML content)
        })
        .then(html => {
            var count = 0

            for (i = 300; count < 5; i--) {

                if (html.includes(`jujutsu-kaisen-chapter-${i}`)) {
                    txt += `Capítulo **${i}**`;

                    if (count == 0) {
                        if (client.cache["mangas"][0].count == i) {
                            break;
                        }

                        txt += ` 🔥`
                        chapter = i;
                        url = `https://ww2.jujustukaisen.com/manga/jujutsu-kaisen-chapter-${chapter}/`
                    }
                    txt += "\n"
                    count++
                }

            }
        })


    fcs.newData(mangaScheme, { count: chapter })
    client.cache["mangas"][0].count = chapter

    var usersid = [
        "444601920791904276", "558417008262381607"
    ]

    usersid.forEach(async userid => {
        var user = client.users.cache.get(userid)
        user.send({ embeds: [await fcs.embed("9C80E1", "NOVO CAPÍTULO DE JUJUTSU KAISEN", url, null, txt, null, randomUrl)] })
    })

    var user = client.users.cache.get('444601920791904276')
    user.send({ embeds: [await fcs.embed("9C80E1", "NOVO CAPÍTULO DE JUJUTSU KAISEN", url, null, txt, null, randomUrl)] })
}

async function runF(client) {

    for (i = 0; i >= 0; i++) {

        await fcs.sleep(600 * 1000)
        await checkUrl("https://ww2.jujustukaisen.com/", client)
    }

}



fcs.meth()
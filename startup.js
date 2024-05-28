// Actual requirements
const fs = require('fs')
const Discord = require("discord.js");
const fcs = require("./functions.js");
const mongo = require(`./mongo`)
const fetch = require("node-fetch")





module.exports = {
    async distube(client) {

        // Music Player
        const { DisTube } = require('distube')
        const { YtDlpPlugin } = require('@distube/yt-dlp');

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

        // EVENTOS - Distube
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


    },


    async jjk(url, client) {

        const arrayUrl = [
            "https://sm.ign.com/ign_br/screenshot/default/capa-jujutsu-kaisen_kfzu.png",
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


    },

    async updateResets() {

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


    }
}
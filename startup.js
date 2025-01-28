// Actual requirements
const fs = require('fs')
const Discord = require("discord.js");
const fcs = require("./functions.js");
const mongo = require(`./mongo`)
const fetch = require("node-fetch")
const cron = require("cron");
const user = require('./schemes/user.js');



module.exports = {

    async checkManga(url, client, usersId, arrayUrl, chapterName, fullurl, newChapText, idNumber, newData, embed) {

        const randomUrl = arrayUrl[Math.floor(Math.random() * (arrayUrl.length - 1))]

        const mangaScheme = require("./schemes/manga.js")
        var txt = `**Os capítulos mais recentes são:** \n\n`

        var chapter = 0;


        // In case the network error occurs
        try {

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

                        if (html.includes(`${chapterName}${i}`)) {
                            txt += `Capítulo **${i}**`;

                            if (count == 0) {
                                if (client.cache["mangas"][idNumber - 1]) {

                                    if (client.cache["mangas"][idNumber - 1].count == i) {
                                        break;
                                    }

                                } else {
                                    client.cache["mangas"][idNumber - 1] = { count: 0, _id: idNumber }
                                }

                                txt += ` 🔥`
                                chapter = i;
                                url = `${fullurl}${chapter}/`
                            }
                            txt += "\n"
                            count++
                        }

                    }
                })

            if (!chapter) {
                return
            }

            newData(mangaScheme, { _id: idNumber, count: chapter })
            client.cache["mangas"][idNumber - 1].count = chapter


            for (i = 0; i < usersId.length; i++) {
                var userid = usersId[i];

                var user = client.users.cache.get(userid)
                user.send({ embeds: [await embed("9C80E1", newChapText, url, null, txt, null, randomUrl)] })
            }

        } catch (e) {
            console.log(e);
        }


    },

    async updateResets() {

        // BOT RESETS UPDATER
        fs.readFile('./database/data.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                // Turning to object
                var soul = JSON.parse(data);

                soul.resets++
                soul.lastReset = new Date()

                fs.writeFileSync('./database/data.json', JSON.stringify(soul));
                console.log("Resets: " + soul.resets)
            }
        });


    },

    async checkLoLplayers(client) {

        const list = client.guilds.cache.get("881892954803941396");
        list.members.cache.forEach(member => {

        });

    },

    async kronos(client) {
        const users = [
            "414198565523423235",
            "444601920791904276"
        ]

        new cron.CronJob("0 0 20 * * 7", function () {
            for (var user of users) {

                user = client.users.cache.get(user)

                user.send("eae fdp, já fez o EOL?");
            }
        }).start()
    },

    async checkFont(url, client, userIds, embed) {

        // In case the network error occurs
        try {

            await fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');

                    }
                    return response.text(); // Get the response as text (HTML content)
                })
                .then(async html => {

                    if (html.includes(`- Escola de Engenharia de São Carlos`)) {

                        for (var userid of userIds) {
                            var user = client.users.cache.get(userid)
                            user.send({ embeds: [await embed("9C80E1", "SAIU SAIU SAIU", url, null, "Saiu finalmente o Edital da transferência da EESC (dsclp por spammar, o weber vai ter q me desligar até eu parar)", null, "https://i.imgur.com/i64Gi6K.jpeg")] })
                        }

                    }
                })

        } catch (e) {
            console.log(e);
        }


    },

    /*

    async kronos(client) {
        var alerts = client.cache["alerts"]

        // EOL alert
        // for every person (ignore noob :ˆ)
        for (noob of alerts[1]) {
            cron.CronJob("0 0 20 * * 7");
        }
    }
        */


}
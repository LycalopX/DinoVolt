const Discord = require('discord.js');
const fs = require('fs');
const mongo = require("./mongo")
const { JSDOM } = require("jsdom")
const fetch = require("node-fetch");
const startup = require("./startup.js")

async function sleep(duration) {
    return new Promise(resolve => setTimeout(resolve, duration))
}



module.exports = {

    async sum(x, y) {
        sum = x + y;

        return sum;
    },

    async embed(color, title, URL, author, description, thumbnail, image, timestamp, footer) {

        const Embed = new Discord.EmbedBuilder();

        if (color) {
            Embed
                .setColor(color);
        }
        if (title) {
            Embed
                .setTitle(title)
        }
        if (URL) {
            Embed
                .setURL(URL)
        }
        if (author) {
            Embed
                .setAuthor(author)
        }
        if (description) {
            Embed
                .setDescription(description)
        }
        if (thumbnail) {
            Embed
                .setThumbnail(thumbnail)
        }
        if (image) {
            Embed
                .setImage(image)
        }
        if (timestamp) {
            Embed
                .setTimestamp(timestamp)
        }
        if (footer) {
            Embed
                .setFooter(footer);
        }

        return Embed;
    },






    // MongoDB file managers

    // Update
    async updateData(schema, newJSONObject) {
        // Atualizar as configs...
        await mongo().then(async (mongoose) => {
            try {
                await schema.findOneAndUpdate(
                    {
                        _id: newJSONObject._id
                    },
                    newJSONObject,
                    {
                        upsert: true
                    }
                )
            } catch (err) {
                console.log(err)

            } finally {
                await mongoose.connection.close()
            }
        })
    },


    // Guild info update
    async newData(schema, newJSONObject) {
        // Atualizar as configs...
        await mongo().then(async (mongoose) => {
            try {
                await schema.findOneAndUpdate(
                    {
                        _id: newJSONObject._id
                    },
                    newJSONObject,
                    {
                        upsert: true
                    }
                )
            } catch (err) {
                console.log(err)

            } finally {
                await mongoose.connection.close()
            }
        })
    },


    async deleteData(schema, id) {
        // Deletar as configs

        await mongo().then(async (mongoose) => {
            try {
                await schema.deleteOne({ _id: id })

                message.channel.send(newE("s", `A guild foi apagada por completo do sistema...`))
                return

            } catch (err) {
                console.log(err)

            } finally {
                await mongoose.connection.close()
                return
            }
        })
    },


    async getData(schema, id) {

        await mongo().then(async (mongoose) => {
            try {
                const result = await schema.find({ _id: id })

                cache = {
                    result
                }

            } finally {
                await mongoose.connection.close()
            }
        })

        return cache;
    },


    // Guild info update
    async setNewData(schema, newJSONObject) {
        // Atualizar as configs...
        await mongo().then(async (mongoose) => {
            try {
                await new schema(
                    newJSONObject
                ).save();

            } catch (err) {
                console.log(err)

            } finally {
                await mongoose.connection.close()
            }
        })
    },







    async errEmbed(title, description, thumbnail, image) {

        const Embed = new Discord.EmbedBuilder();

        Embed
            .setColor("FF0000");

        if (title) {
            Embed
                .setTitle(title)
        }
        if (description) {
            Embed
                .setDescription(description)
        }
        if (thumbnail) {
            Embed
                .setThumbnail(thumbnail)
        }
        if (image) {
            Embed
                .setImage(image)
        }

        return Embed;
    },

    async createUser(client, user) {
        const userSchema = require("./schemes/user")

        const structure = {
            _id: user.id,
            coins: 0,
            points: {
                rightQuizAnswers: 0,
                bruteExp: 0,
                exp: 0,
            },
            dateArrived: new Date(),
            words: 0,
        }

        await newData(userSchema, structure)

        client.cache.users.push(structure)

        console.log(client.cache.users)

    },



    async findUrl(client, user) {

        var cache = client.cache

        var result = cache.users.filter(obj => {
            return obj._id === user.id
        })

        if (!result[0]) {
            await createUser(client, user)

            cache = client.cache
            result = cache.users.filter(obj => {
                return obj._id === user.id
            })
        }

        // Link para obter imagem
        var link = `https://discord-avatar.com/en/user/?id=${user.id}`


        if (!result[0].link) {

            await fetch(link)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text(); // Get the response as text (HTML content)
                })
                .then(html => {

                    // Parse the HTML content using jsdom
                    const dom = new JSDOM(html);
                    const document = dom.window.document;

                    // Find the image element using its id attribute
                    const imgElement = document.querySelector('#user-avatar'); // Select by id

                    if (imgElement) {
                        var imgUrl = imgElement.src;
                        result[0].link = imgUrl

                    } else {
                        console.log('No image element found on the webpage.');
                    }
                })
                .catch(error => {
                    console.error('There was a problem with fetching the webpage:', error);
                });

            return result;

        } else {
            return result;
        }


    },


    async beautifulTime(t, yearb, monthb, dayb, hourb, minuteb, secondb, milisecondsb, r) {

        var time = t
        var removalTime = r
        var txt = ``

        if (isNaN(time)) {
            if (typeof time === 'string') {
                time = new Date(time)
            }
            if (typeof removalTime === 'string') {
                removalTime = new Date(removalTime)
            }

            time = time.getTime()
            removalTime = removalTime.getTime()

            time = Math.abs(time - removalTime)

            console.log(time)

        }

        years = (time - (time % 31536000000)) / 31536000000

        months = (time % 31536000000 - (time % 2628000000)) / 2628000000

        days = (time % 2592000000 - (time % 86400000)) / 86400000

        hours = (time % 86400000 - (time % 3600000)) / 3600000

        minutes = (time % 3600000 - (time % 60000)) / 60000

        seconds = (time % 60000 - (time % 1000)) / 1000

        miliseconds = ((time % 1000))

        if (years != 0 && yearb != false) {
            txt += `${years} anos `
        }
        if (months != 0 && monthb != false) {
            txt += `${months} meses `
        }
        if (days != 0 && dayb != false) {
            txt += `${days} dias `
        }
        if (hours != 0 && hourb != false) {
            txt += `${hours} horas `
        }
        if (minutes != 0 && minuteb != false) {
            txt += `${minutes} minutos `
        }
        if (seconds != 0 && secondb != false) {
            txt += `${seconds} segundos `
        }
        if (miliseconds != 0 && milisecondsb != false) {
            txt += `${miliseconds} milisegundos`
        }

        return txt
    },

    // carrega banco de dados do mongoDB, e faz uma cache local para acessá-los rapidamente no futuro
    async LoadFullDataBase(mongoose) {

        const cache = {};

        const collections = await mongoose.connection.db.listCollections().toArray()

        for (i = 0; i < collections.length; i++) {
            var name = collections[i].name
            documents = await mongoose.connection.db.collection(name).find({}).toArray()

            cache[collections[i].name] = documents
        }

        return cache;

    },

    // Pausa por alguns segundos o código, por meio de uma promessa 🤩
    sleep,


    // Roda periodicamente
    async runF(client) {

        var usersId = [
            "444601920791904276",
            "462421774714535937",
            "669519587267706881"
        ]

        startup.updateResets();
        startup.kronos(client)
        startup.Music(client)

        for (i = 0; i >= 0; i++) {

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

            // TBATE
            await startup.checkManga("https://thebeginningaftertheendmanga.com/", client, usersId, tbateUrl, "the-beginning-after-the-end-chapter-", "https://thebeginningaftertheendmanga.com/manga/the-beginning-after-the-end-chapter-",
                "NOVO CAPÍTULO - THE BEGINNING \nAFTER THE END", 3, this.newData, this.embed);

            // Chainsaw Man
            await startup.checkManga("https://readchainsaw-man.com/", client, usersId, csmUrl, "chainsaw-man-chapter-", "https://readchainsaw-man.com/manga/chainsaw-man-chapter",
                "NOVO CAPÍTULO - CHAINSAW MAN", 2, this.newData, this.embed);

            // One punch Man
            await startup.checkManga("https://onepunch-man.us/", client, usersId, opmUrl, "one-punch-man-chapter-", "https://ww5.readopm.com/chapter/one-punch-man-chapter-",
                "NOVO CAPÍTULO - ONE-PUNCH MAN", 4, this.newData, this.embed);

            await sleep(30 * 60 * 1000) // 30 minutos
        }

    },

    async meth() {

    }
}

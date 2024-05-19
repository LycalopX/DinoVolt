const Discord = require('discord.js');
const fs = require('fs');
const mongo = require("./mongo")
const { JSDOM } = require("jsdom")

async function meth() {
}

async function sum(x, y) {
    sum = x + y;

    return sum;
}

async function embed(color, title, URL, author, description, thumbnail, image, timestamp, footer) {

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
}






// MongoDB file managers

// Update
async function updateData(schema, newJSONObject) {
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
}


// Guild info update
async function newData(schema, newJSONObject) {
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
}


async function deleteData(schema, id) {
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
}


async function getData(schema, id) {

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
}






async function errEmbed(title, description, thumbnail, image) {

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
}

async function createUser(client, user) {
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

}



async function findUrl(client, user) {

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


}


async function beautifulTime(t, yearb, monthb, dayb, hourb, minuteb, secondb, milisecondsb, r) {

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
    if (months != 0  && monthb != false) {
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
}



module.exports = { meth, sum, embed, updateData, newData, deleteData, getData, errEmbed, createUser, findUrl, beautifulTime }
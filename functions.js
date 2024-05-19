const Discord = require('discord.js');
const fs = require('fs');
const mongo = require("./mongo")

async function meth () {
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

}



module.exports = { meth, sum, embed, updateData, newData, deleteData, getData, errEmbed, createUser }
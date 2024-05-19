const Discord = require('discord.js');
const fcs = require("../../functions")
const fetch = require("node-fetch")
const { JSDOM }  = require("jsdom")



function roleta(x) {
    var y = Math.floor(Math.random() * x);

    if (y == 0) {
        return true;
    }
    return false;
}

async function embedLayout(title, content, image, color) {
    return await fcs.embed(color, title, null, null, content, image)
}

const sleep = (duration) => {
    return new Promise(resolve => setTimeout(resolve, duration))
}

async function findUrl(client, user) {

    const cache = client.cache

    var result = cache.users.filter(obj => {
        return obj._id === user.id
    })


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

        return result[0].link;

    } else {
        return result[0].link;
    }

}


// COMMANDS
module.exports = {
    data: new Discord.SlashCommandBuilder()

        .setName("roletarussa")
        .setDescription('Faça uma roleta russa para definir se será banido do servidor!'),

    async execute(interaction, client) {


        // Whatever

        var user1 = interaction.member;


        const emoji1 = client.emojis.cache.get("1241363251183226912");
        const emoji2 = client.emojis.cache.get("1241363235584741519")


        var embed = await fcs.embed("#C62D42", `${user1.user.globalName}`, null, null, `${emoji1} ${user1}, tem certeza de que você quer fazer a roleta russa?? Você pode ser banido! ${emoji2}`)

        interaction.reply({ embeds: [embed] })

        const message = await interaction.fetchReply();

        message.react('🔫').then(() => message.react('💀'));


        const filter = (reaction, user) => (reaction.emoji.name === '🔫' || reaction.emoji.name === '💀') && user.id === user1.id

        message.awaitReactions({ filter: filter, max: 1, time: 60_000, errors: ['time'] })

            .then(async collected => {
                const reaction = collected.first();


                if (collected.first()._emoji.name == '🔫') {
                    const embed3 = await fcs.embed("#E6E6E4", "Ok! Você pediu!", null, null, `Vamos rodar a roleta, ${user1} vamos??? :/`)

                    interaction.followUp({ embeds: [embed3] });
					


                    var embed5 = await fcs.embed("#E6E6E4", `Você irá morrer??`, null, null, `Segundos para primeiro tiro: 3`, null, "https://i.imgur.com/w2Vb6RD.gif");

                    interaction.followUp({ embeds: [embed5] })
                        .then(async msg => {

                            for (var i = 2; i >= 0; i--) {
                                var embed5 = await fcs.embed("#E6E6E4", `Você irá morrer??`, null, null, `Segundos para primeiro tiro: ${i}`, null, "https://i.imgur.com/w2Vb6RD.gif");

                                await sleep(1000)

                                msg.edit({ embeds: [embed5] })
                            }
                        });

                    await sleep(3000)



                    var x = roleta(6)
                    var y = roleta(6)

                    var imageUrl1 = await findUrl(client, user1)

                    try {
                        console.log(imageUrl1)
                    } catch (e) {
                        return e
                    }


                    if (x) {
                        user1.send({
                            embeds: [await embedLayout(`${user1.user.username}, morreu!`,
                                "Moleu infelizmente, para jogar novamente peça para alguém te desbanir :(",
                                imageUrl1, "#5833FF"
                            )]
                        });

                        interaction.followUp({
                            embeds: [await embedLayout(`${user1.user.username} Morreu!!!`,
                                "F no chat rapazie, o garoto foi banido",
                                imageUrl1, "#5833FF"
                            )]
                        })
                    } else {

                        interaction.followUp({
                            embeds: [await embedLayout(`${user1.user.username} Sobreviveu!!!`,
                                `${user1} se safou!`,
                                imageUrl1, "#5833FF"
                            )]
                        })
                    }

                } else {
                    const embed4 = await fcs.embed("#E6E6E4", "Haha, fraco", null, null, `Desistiu na hora hein? Melhor sorte da próxima! ${emoji2}`)
                    interaction.followUp({ embeds: [embed4] });
                }
            })
            .catch(async collected => {
				console.log(collected)

                const embed2 = await fcs.embed("#B3FCB5", "Não aceitou a tempo :/", null, null, "Desculpa, por mais que eu queria muito girar a roleta, eu não posso se você não me responder!")
                interaction.followUp({ embeds: [embed2] })
            });
        return
    },
};
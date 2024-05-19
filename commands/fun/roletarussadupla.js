const Discord = require('discord.js');
const fcs = require("../../functions")
const fetch = require("node-fetch")
const { JSDOM } = require("jsdom")



function roleta(x) {
    var y = Math.floor(Math.random() * x);

    if (y == 0) {
        return true;
    }
    return false;
}

const sleep = (duration) => {
    return new Promise(resolve => setTimeout(resolve, duration))
}

async function embedLayout(title, content, image, color) {
    return await fcs.embed(color, title, null, null, content, image)
}

async function findUrl(client, user) {

    const cache = client.cache

    var result = cache.users.filter(obj => {
        return obj._id === user.id
    })


    if (!result) {
        await fcs.createUser(client, user)
    }

    // Link para obter imagem
    var link = `https://discord-avatar.com/en/user/?id=${user.id}`

    if (!result[0].link) {
        console.log("sua mae")

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

        .setName("roletarussadupla")
        .setDescription('Duele com o seu amigo para decidir quem será o sobrevivente do servidor! (Os dois podem morrer!!!)')

        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('🔫 Usuário a ser duelado 🔫')),

    async execute(interaction, client) {


        // Whatever

        var user1 = interaction.member;
        const user2 = interaction.options.getUser('user')

        if (!user2 || user1 == user2 || user2.id == client.user.id) {
            await interaction.reply({ embeds: [await fcs.embed("#E6E6E4", "Chame seu colega para jogar junto! ")] })
            return;
        }



        const emoji1 = client.emojis.cache.get("1241363251183226912");
        const emoji2 = client.emojis.cache.get("1241363235584741519")


        var embed = await fcs.embed("#C62D42", `${user1.user.globalName} X ${user2.globalName}`, null, null, `${emoji1} ${user2}, ${user1} te convida para um duelo! Você aceita? ${emoji2}`)

        interaction.reply({ embeds: [embed] })

        const message = await interaction.fetchReply();

        message.react('🔫').then(() => message.react('💀'));


        const filter = (reaction, user) => (reaction.emoji.name === '🔫' || reaction.emoji.name === '💀') && user.id === user2.id

        message.awaitReactions({ filter: filter, max: 1, time: 60_000, errors: ['time'] })

            .then(async collected => {
                const reaction = collected.first();


                if (collected.first()._emoji.name == '🔫') {
                    const embed3 = await fcs.embed("#E6E6E4", "Ok! Você pediu!", null, null, `Vamos rodar a roleta, ${user1} e ${user2}, vamos??? :/`)

                    interaction.followUp({ embeds: [embed3] });


                    var embed5 = await fcs.embed("#E6E6E4", `Quem irá morrer??`, null, null, `Segundos para primeiro tiro: 3`, null, "https://i.imgur.com/w2Vb6RD.gif");

                    interaction.followUp({ embeds: [embed5] })
                        .then(async msg => {

                            for (var i = 2; i >= 0; i--) {
                                var embed5 = await fcs.embed("#E6E6E4", `Quem irá morrer??`, null, null, `Segundos para primeiro tiro: ${i}`, null, "https://i.imgur.com/w2Vb6RD.gif");

                                await sleep(1000)

                                msg.edit({ embeds: [embed5] })
                            }
                        });

                    await sleep(3000)


                    var x = roleta(6)
                    var y = roleta(6)

                    var imageUrl1 = await findUrl(client, user1)
                    var imageUrl2 = await findUrl(client, user2)

                    try {
                        console.log(imageUrl2)
                        console.log(imageUrl1)
                    } catch (e) {
                        return e
                    }


                    if (x) {
                        try {
                            user1.send({
                                embeds: [await embedLayout(`${user1.user.username}, morreu!`,
                                    "Moleu infelizmente, para jogar novamente peça para alguém te desbanir :(",
                                    imageUrl1, "#5833FF"
                                )]
                            });

                            await user1.ban()

                        } catch (e) {
                            interaction.followUp({ embeds: [await fcs.errEmbed("Banimento cancelado", `Infelizmente, devido a algum erro no sistema, senhor ${user1} se safou dessa vez`
                            )]})
                            console.log(e)

                            return
                        }

                        interaction.followUp({
                            embeds: [await embedLayout(`${user1.user.username} Morreu!!!`,
                                `${emoji1} F no chat rapazie, o garoto foi BANIDO ${emoji2}`,
                                imageUrl1, "#5833FF"
                            )]
                        })
                    } else {

                        interaction.followUp({
                            embeds: [await embedLayout(`${user1.user.username} SOBREVIVEU!!!`,
                                `${emoji1} ${user1} se safou! ${emoji2}`,
                                imageUrl1, "#5833FF"
                            )]
                        })
                    }

                    if (y) {
                        try {
                            user1.send({
                                embeds: [await embedLayout(`${user1.user.username}, morreu!`,
                                    "Moleu infelizmente, para jogar novamente peça para alguém te desbanir :(",
                                    imageUrl1, "#5833FF"
                                )]
                            });

                            await user2.ban()

                        } catch (e) {
                            interaction.followUp({ embeds: [await fcs.errEmbed("Banimento cancelado", `Infelizmente, devido a algum erro no sistema, senhor ${user1} se safou dessa vez`
                            )]})
                            console.log(e)

                            return
                        }

                        interaction.followUp({
                            embeds: [await embedLayout(`${user2.username} Morreu!!!`,
                                `${emoji1} F no chat rapazie, o garoto foi BANIDO ${emoji2}`,
                                imageUrl2, "FF9633"
                            )]
                        })
                    } else {

                        interaction.followUp({
                            embeds: [await embedLayout(`${user2.username} SOBREVIVEU!!!`,
                                `${emoji1} ${user2} se safou! ${emoji2}`,
                                imageUrl2, "FF9633"
                            )]
                        })
                    }

                } else {

                    const embed4 = await fcs.embed("#E6E6E4", "Haha, fraco", null, null, `${user2} te deixou na mão mano kkkkkkkkkkkkk`)
                    interaction.followUp({ embeds: [embed4] });
                }
            })
            .catch(async collected => {
                console.log(collected)

                const embed2 = await fcs.embed("#E6E6E4", "Não aceitou a tempo :/", null, null, `Ou ele não viu o duelo a tempo, ou alguém te deixou na mão ${user1} :/`)
                interaction.followUp({ embeds: [embed2] })
            });
        return
    },
};
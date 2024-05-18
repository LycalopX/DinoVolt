const Discord = require('discord.js');
const fetch = require("node-fetch")

const fcs = require("../../functions")
const { JSDOM } = require('jsdom');



// COMMANDS
module.exports = {
    data: new Discord.SlashCommandBuilder()

        .setName("mensagens")
        .setDescription('Informa o número de mensagens que você enviou no servidor do Discord do SEPT!')

        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Colocar o usuário cujo nome gostaria de colocar.')),

    async execute(interaction, client) {


        const option = interaction.options.getUser('user')
        var user = ""
        var username = ""
        var globalName = ""



        // Checando se foi colocada uma opção ou não...
        if (option) {
            user = option
            username += user.username
            globalName += user.globalName
        } else {
            user = interaction.member
            globalName += user.user.globalName
            username += user.user.username
        }


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

        }


        var txt = `**Rupees**: ${result[0].coins}
**Questões certas do Quiz**: ${result[0].points.rightQuizAnswers}
**xpBruto**: ${result[0].points.bruteExp}
**EXP**: ${result[0].points.exp}

**Primeira mensagem**: ${result[0].dateArrived},
**Número de mensagens enviadas**: ${result[0].words}\n`

        var embed = await fcs.embed("#DFE3EE", `${globalName} - ${username}`, null, null, txt, null, result[0].link)

        interaction.reply({ embeds: [embed] })
    },
};

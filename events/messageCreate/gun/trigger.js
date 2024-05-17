const fcs = require("../../../functions");

module.exports = {
    name: "words",
    once: true,
    async execute(message, client) {

        // So, first we gotta check if the person has a databank
        const cache = client.cache;
        console.log(cache)

        const userSchema = require("../../../schemes/user")

        var result = cache.users.filter(obj => {
            return obj._id === message.author.id
        })



        if (result.length == 0) {
            const structure = {
                _id: message.author.id,
                coins: 0,
                points: {
                    rightQuizAnswers: 0,
                    bruteExp: 0,
                    exp: 0,
                    name: message.author.name
                },
                dateArrived: new Date(),
                words: 0,
            }

            await fcs.newData(userSchema, structure)

            client.cache.users.push(structure)
        }


        var result = cache.users.filter(obj => {
            return obj._id === message.author.id
        })

        // Word counter
        var words = result[0].words + 1
        result[0].words += 1

        fcs.updateData(userSchema, { _id: message.author.id, words: words })


        if (result[0].words == 10) {
            message.channel.send(`${message.author}, Parabéns! Você atingiu 10 palavras.`)
        }
    },
};


// Event
const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	once: false,
	execute(message, client) {

        var author = message.author.username;
        if (author == client.user.username) return;

        // CODE

        // CODE
	},
};
const Discord = require('discord.js');
const fs = require('fs');

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


module.exports = { meth, sum, embed }
const { Events, EmbedBuilder, Colors, User, Client } = require('discord.js');

joined = {
	name: Events.GuildMemberAdd,
	execute(client, event) {
		const test = new EmbedBuilder()
		.setTitle('Bienvenue').setDescription(`${event.user.tag}, vient de nous rejoindre !!!!`)
		.setFooter({text: "N'hésitez pas à lui souhaiter la bienvenue."})
		.setColor(Colors.Fuchsia)
		.setThumbnail(event.user.displayAvatarURL())
		client.channels.fetch('1105511401822363800').then(
			channel => channel.send({embeds: [test]})
		)
	}
},

module.exports = [joined];
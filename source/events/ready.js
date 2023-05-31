const { Events, ActivityType, EmbedBuilder, Colors } = require('discord.js');

ready = {
	name: Events.ClientReady,
	once: true,
	execute(client2, client) {
		client.user.setActivity('Night Cavern', {type: ActivityType.Watching});
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const log = new EmbedBuilder()
		.setTitle(`[LOGIN SUCCESSFUL]`)
		.setColor(Colors.Blurple)
		.setThumbnail(client.user.displayAvatarURL())
		.setTimestamp();
		client.channels.cache.get('1105622124825170021').send({embeds: [log]});
	},
}

module.exports = [ready];

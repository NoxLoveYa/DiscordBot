const { Events, EmbedBuilder, Colors } = require('discord.js');

create = {
	name: Events.InteractionCreate,
	async execute(client, interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
		if (command.perms) {
			const member = interaction.guild.members.cache.get(interaction.user.id);
			if (!member.permissions.has(command.perms)) {
				await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
				//log error in logs channel
				const log = new EmbedBuilder()
				.setTitle(`[EVENT ERROR]`)
				.setFields(
					{ name: 'Command:', value: interaction.commandName },
					{ name: 'User:', value: interaction.user.tag },
					{ name: 'Channel:', value: interaction.channel.name},
					{ name: 'Error:', value: 'User does not have permission to use this command.' },
				)
				.setColor(Colors.Red)
				.setThumbnail(interaction.user.displayAvatarURL())
				.setTimestamp();
				client.channels.fetch('1105622124825170021').then(
					channel => channel.send({embeds: [log]})
				);
				return;
			}
		}
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
}

module.exports = [create];

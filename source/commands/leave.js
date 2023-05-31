const { SlashCommandBuilder, Client, EmbedBuilder, Embed, Colors } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('leave the voice channel'),
	async execute(interaction) {
        const channel = getVoiceConnection(interaction.member.voice.channel.guild.id);
        if (!channel) return interaction.reply({ content: 'Not connected!', ephemeral: true });
        channel.destroy();
        interaction.reply({ content: 'Left Successfully!', ephemeral: true });
        const log = new EmbedBuilder()
        .setTitle(`[EVENT SUCCESS]`)
        .setColor(Colors.Green)
        .setFields(
            { name: 'Command:', value: interaction.commandName },
            { name: 'User:', value: interaction.user.tag },
            { name: 'Channel:', value: interaction.channel.name},
        )
        .setThumbnail(interaction.user.displayAvatarURL())
        .setTimestamp();
        interaction.client.channels.cache.get('1105622124825170021').send({embeds: [log]})
    }
};

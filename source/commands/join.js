const { SlashCommandBuilder, Client, EmbedBuilder, Embed, Colors } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Connect to the voice channel'),
	async execute(interaction) {
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.reply({ content: 'You need to join a voice channel first!', ephemeral: true });
        var connection = getVoiceConnection(interaction.member.voice.channel.guild.id);
        if (connection) return interaction.reply({ content: 'Already connected!', ephemeral: true });
        connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.member.voice.channel.guild.id,
            adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
        });
        if (connection) interaction.reply({ content: 'Joined Successfully!', ephemeral: true });
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

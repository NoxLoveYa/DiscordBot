const { SlashCommandBuilder, Client, EmbedBuilder, Embed, Colors } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

const fs = require('fs');

const yt = require('yt-converter');

const path = require('path')

var queue = [];
var players;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a song')
        .addStringOption(option =>
            option.setName('song')
            .setDescription('song name')
            .setRequired(true)),
	async execute(interaction) {
        const connection = getVoiceConnection(interaction.member.voice.channel.guild.id);
        if (!connection) interaction.reply({ content: 'Not connected!', ephemeral: true });
        var player = createAudioPlayer();
        connection.subscribe(player)
        const song = interaction.options.getString('song');
        yt.getInfo(song).then(infos => {
            yt.convertAudio({
                url: `${song}`,
                itag: 140,
                directoryDownload: __dirname,
                title: "Your title here"
            }, null, function() {
                player.play(createAudioResource(__dirname + '/' + infos.title + '.mp3'))
            })
        })
        interaction.reply({ content: 'Playing !!', ephemeral: true })
    }
};

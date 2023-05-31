const { SlashCommandBuilder, EmbedBuilder, Colors } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rename')
		.setDescription('rename a user of the server')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('user to rename')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
            .setDescription('new name of the user')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('description')
            .setDescription('reason for the rename')
            .setRequired(false)),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        const name = interaction.options.getString('name');
        var description = interaction.options.getString('description');
        if (description == null) {
            description = 'No reason provided'
        }
        const member = interaction.guild.members.cache.get(user.id);
        member.edit({ nick: name, reason: description });
        const log = new EmbedBuilder()
        .setTitle(`[EVENT SUCCESS]`)
        .setFields(
            { name: 'Command:', value: interaction.commandName },
            { name: 'User:', value: interaction.user.tag },
            { name: 'Channel:', value: interaction.channel.name},
            { name: 'Renamed:', value: user.tag },
            { name: 'New name:', value: name },
            { name: 'Reason:', value: description },
        )
        .setColor(Colors.Green)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setTimestamp();
        interaction.client.channels.cache.get('1105622124825170021').send({embeds: [log]})
        interaction.reply({ content: `Successfully renamed: ${user.tag} !!`, fetchReply: true }).then(reply => {
            reply.delete({ timeout: 10 })
        })
	},
    perms: PermissionFlagsBits.Administrator,
};
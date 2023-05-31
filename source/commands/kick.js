const { SlashCommandBuilder, EmbedBuilder, Colors } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('kick a user out of the server')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('user to kick')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('description')
            .setDescription('reason for the kick')
            .setRequired(false)),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        var description = interaction.options.getString('description');
        if (description == null) {
            description = 'No reason provided'
        }
        const member = interaction.guild.members.cache.get(user.id);
        try {member.kick({ reason: description });}
        catch {return interaction.reply({ content: `Permissions error`})}
        const log = new EmbedBuilder()
        .setTitle(`[EVENT SUCCESS]`)
        .setFields(
            { name: 'Command:', value: interaction.commandName },
            { name: 'User:', value: interaction.user.tag },
            { name: 'Channel:', value: interaction.channel.name},
            { name: 'Kicked:', value: user.tag },
            { name: 'Reason:', value: description },
        )
        .setColor(Colors.Green)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setTimestamp();
        interaction.client.channels.cache.get('1105622124825170021').send({embeds: [log]})
        interaction.reply({ content: `Successfully kicked: ${user.tag} !!`, fetchReply: true }).then(reply => {
            reply.delete({ timeout: 10 })
        })
	},
    perms: PermissionFlagsBits.Administrator,
};
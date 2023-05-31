const { SlashCommandBuilder, EmbedBuilder, Colors } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('timeout a user of the server')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('user to timeout')
            .setRequired(true))
        .addIntegerOption(option =>
            option.setName('time')
            .setDescription('time (minutes) to timeout the user')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('description')
            .setDescription('reason for the timeout')
            .setRequired(false)),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        var description = interaction.options.getString('description');
        if (description == null) {
            description = 'No reason provided'
        }
        var time = interaction.options.getInteger('time');
        if (time == 0)
            time = 1;
        const member = interaction.guild.members.cache.get(user.id);
        member.timeout(time * 60 * 1000, description);
        const log = new EmbedBuilder()
        .setTitle(`[EVENT SUCCESS]`)
        .setFields(
            { name: 'Command:', value: interaction.commandName },
            { name: 'User:', value: interaction.user.tag },
            { name: 'Channel:', value: interaction.channel.name},
            { name: 'Muted:', value: user.tag },
            { name: 'Time:', value: `${time * 60} minutes`},
            { name: 'Reason:', value: description },
        )
        .setColor(Colors.Green)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setTimestamp();
        interaction.client.channels.cache.get('1105622124825170021').send({embeds: [log]})
        interaction.reply({ content: `Successfully muted: ${user.tag} for ${time * 60} minutes !!`, fetchReply: true }).then(reply => {
            reply.delete({ timeout: 10 })
        })
	},
    perms: PermissionFlagsBits.Administrator,
};
const { SlashCommandBuilder, EmbedBuilder, Colors } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mc-skin')
		.setDescription('show the current minecraft skin of a username')
        .addStringOption(option =>
            option.setName('username')
            .setDescription('user to rename')
            .setRequired(true)),
        async execute(interaction) {
            const user = interaction.options.getString('username');
            const embed = new EmbedBuilder()
            .setTitle(`Skin de ${user}`)
            .setImage(`https://mc-heads.net/body/${user}/600.png`)
            .setTimestamp()
            .setColor(0x2e9aff);
            const log = new EmbedBuilder()
            .setTitle(`[EVENT SUCCESS]`)
            .setFields(
                { name: 'Command:', value: interaction.commandName },
                { name: 'User:', value: interaction.user.tag },
                { name: 'Channel:', value: interaction.channel.name},
                { name: 'Asked:', value: user },
            )
            .setColor(Colors.Green)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setTimestamp();
            interaction.client.channels.cache.get('1105622124825170021').send({embeds: [log]})
            return interaction.reply({embeds: [embed]});
        },
};
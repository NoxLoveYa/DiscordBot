const { SlashCommandBuilder, EmbedBuilder, Colors } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clean')
		.setDescription('clean x amount of messages')
        .addIntegerOption(option => 
            option.setName('amount')
            .setDescription('amount of messages to clean')
            .setRequired(false)),
	async execute(interaction) {
		await interaction.reply('Cleaning...');
        var amount = interaction.options.getInteger('amount') ?? 10;
        amount += 1;
        if (amount > 100)
            amount = 100;
        await interaction.channel.bulkDelete(amount);
        const msg = await interaction.channel.send(`Cleaned ${amount - 1} messages`);
        msg.delete({ timeout: 10000 });
        const log = new EmbedBuilder()
        .setTitle(`[EVENT SUCCESS]`)
        .setFields(
            { name: 'Command:', value: interaction.commandName },
            { name: 'User:', value: interaction.user.tag },
            { name: 'Channel:', value: interaction.channel.name},
            { name: 'Cleaned:', value: `${amount - 1}` },
        )
        .setColor(Colors.Green)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setTimestamp();
        interaction.client.channels.cache.get('1105622124825170021').send({embeds: [log]})
	},
    perms: PermissionFlagsBits.ManageMessages,
};

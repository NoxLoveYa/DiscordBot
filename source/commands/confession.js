const { SlashCommandBuilder, Client, EmbedBuilder, Embed, Colors } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('confession')
		.setDescription('Confess anonymously')
        .addStringOption(option =>
            option.setName('confession')
            .setDescription('Your confession')
            .setRequired(true)),
	async execute(interaction) {
        const confession = interaction.options.getString('confession');
        const channel = interaction.client.channels.cache.get('1105528863972405248');
        const test = new EmbedBuilder()
        .setTitle('Someone confessed !!')
        .setColor(Colors.Fuchsia)
        .setFields(
            { name: 'Confession:', value: confession },
        )
        channel.send({ embeds: [test] });
        interaction.reply({ content: 'Sent !!', fetchReply: true }).then(reply => {
            reply.delete({ timeout: 10 })
        })
        const log = new EmbedBuilder()
        .setTitle(`[EVENT SUCCESS]`)
        .setColor(Colors.Fuchsia)
        .setFields(
            { name: 'Command:', value: interaction.commandName },
            { name: 'User:', value: interaction.user.tag },
            { name: 'Channel:', value: interaction.channel.name},
            { name: 'Confession:', value: confession },
        )
        .setThumbnail(interaction.user.displayAvatarURL())
        .setTimestamp();
        interaction.client.channels.cache.get('1105622124825170021').send({embeds: [log]})
    }
};

const { Events, EmbedBuilder, Colors } = require('discord.js');

added = {
    name: Events.MessageReactionAdd,
	async execute(client, reaction, user) {
        if (reaction.message.id != 1105533096394240020)
            return;
        if (reaction.emoji.name == '✅') {
            const guild = reaction.message.guild;
            const member = guild.members.cache.get(user.id);
            const role = guild.roles.cache.find(role => role.name === "Membre");
            member.roles.add(role);
            const log = new EmbedBuilder()
            .setTitle(`[EVENT SUCCESS]`)
            .setColor(Colors.Green)
            .setFields(
                { name: 'Command:', value: 'rulesReaction' },
                { name: 'User:', value: user.tag },
                { name: 'Channel:', value: reaction.message.channel.name},
                { name: 'Role:', value: role.name },
                { name: 'Emoji:', value: reaction.emoji.name },
                { name: 'Value:', value: 'Added'}
            )
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp();
            client.channels.cache.get('1105622124825170021').send({embeds: [log]})
        }   
	},
}

removed = {
    name: Events.MessageReactionRemove,
	async execute(client, reaction, user) {
        if (reaction.message.id != 1105533096394240020)
            return;
        if (reaction.emoji.name == '✅') {
            const guild = reaction.message.guild;
            const member = guild.members.cache.get(user.id);
            const role = guild.roles.cache.find(role => role.name === "Membre");
            member.roles.remove(role)
            member.roles.add(role);
            const log = new EmbedBuilder()
            .setTitle(`[EVENT SUCCESS]`)
            .setColor(Colors.Fuchsia)
            .setFields(
                { name: 'Command:', value: 'rulesReaction' },
                { name: 'User:', value: user.tag },
                { name: 'Channel:', value: reaction.message.channel.name},
                { name: 'Role:', value: role.name },
                { name: 'Emoji:', value: reaction.emoji.name },
                { name: 'Value:', value: 'Deleted'}
            )
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp();
            client.channels.cache.get('1105622124825170021').send({embeds: [log]})
        }   
	},
}

module.exports = [added, removed];

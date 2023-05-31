const { Events, EmbedBuilder, Colors, User, Client } = require('discord.js');

messageLog = {
    name: Events.MessageCreate,
    execute(client, event) {
        if (event.channel.id === '1105654109878620240') return;
        if (event.author.bot) return;
        if (event.attachments.size > 0) return;
        const test = new EmbedBuilder()
        .setTitle('Message Sent')
        .setFields(
            {name: 'Author', value: event.author.tag, inline: true},
            {name: 'Channel', value: event.channel.name, inline: true},
            {name: 'Message', value: event.content, inline: true},
        )
        .setColor(Colors.DarkGold)
        .setThumbnail(event.author.displayAvatarURL())
        .setTimestamp();
        client.channels.fetch('1105654109878620240').then(
            channel => channel.send({embeds: [test]})
        )
    },
}

messageDeleteLog = {
    name: Events.MessageDelete,
    execute(client, event) {
        if (event.channel.id === '1105654109878620240') return;
        if (event.author.bot) return;
        if (event.attachments.size > 0) return;
        const test = new EmbedBuilder()
        .setTitle('Message Deleted')
        .setFields(
            {name: 'Author', value: event.author.tag, inline: true},
            {name: 'Channel', value: event.channel.name, inline: true},
            {name: 'Message', value: event.content, inline: true},
        )
        .setColor(Colors.DarkVividPink)
        .setThumbnail(event.author.displayAvatarURL())
        .setTimestamp();
        client.channels.fetch('1105654109878620240').then(
            channel => channel.send({embeds: [test]})
        )
    },
}

messageEditLog = {
    name: Events.MessageUpdate,
    execute(client, event) {
        if (event.channel.id === '1105654109878620240') return;
        if (event.author.bot) return;
        if (event.attachments.size > 0) return;
        const test = new EmbedBuilder()
        .setTitle('Message Edited')
        .setFields(
            {name: 'Author', value: event.author.tag, inline: true},
            {name: 'Channel', value: event.channel.name, inline: true},
            {name: 'Message', value: event.content, inline: true},
        )
        .setColor(Colors.DarkAqua)
        .setThumbnail(event.author.displayAvatarURL())
        .setTimestamp();
        client.channels.fetch('1105654109878620240').then(
            channel => channel.send({embeds: [test]})
        )
    },
}

module.exports = [messageLog, messageDeleteLog, messageEditLog];
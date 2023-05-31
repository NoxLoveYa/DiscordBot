const { SlashCommandBuilder, EmbedBuilder, Colors } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const fetch = require('node-fetch');

function rank2color(rank) {
    if (rank == 'IRON') {
        return '#5e5e5e';
    } else if (rank == 'BRONZE') {
        return '#cd7f32';
    } else if (rank == 'SILVER') {
        return '#c0c0c0';
    } else if (rank == 'GOLD') {
        return '#ffd700';
    } else if (rank == 'PLATINUM') {
        return '#e5e4e2';
    } else if (rank == 'DIAMOND') {
        return '#b9f2ff';
    } else if (rank == 'MASTER') {
        return '#ff8c00';
    } else if (rank == 'GRANDMASTER') {
        return '#ff0000';
    } else if (rank == 'CHALLENGER') {
        return '#ff0000';
    } else {
        return '#ffffff';
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lol-stats')
		.setDescription('show the current stats of a current username in a certain region')
        .addStringOption(option =>
            option.setName('username')
            .setDescription('user to fech stats')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('region')
            .setDescription('region of the user')
            .setRequired(true)
            .addChoices(
                {name: 'Brazil', value: 'BR1'},
                {name: 'Europe Nordic & East', value: 'EUN1'},
                {name: 'Europe West', value: 'EUW1'},
                {name: 'Japan', value: 'JP1'},
                {name: 'Korea', value: 'KR'},
                {name: 'Latin America North', value: 'LA1'},
                {name: 'Latin America South', value: 'LA2'},
                {name: 'North America', value: 'NA1'},
                {name: 'Oceania', value: 'OC1'},
                {name: 'Russia', value: 'RU'},
                {name: 'Turkey', value: 'TR1'},
            )),
        async execute(interaction) {
            const user = interaction.options.getString('username');
            const region = interaction.options.getString('region');
            fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user}?api_key=${process.env.RIOT_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                fetch(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}?api_key=${process.env.RIOT_API_KEY}`)
                .then(response => response.json())
                .then(data => {
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
                    const embed = new EmbedBuilder()
                    .setTitle(`Stats of ${user}`)
                    .setFields(
                        { name: 'Summoner Level:', value: `${data[0].tier}`},
                        { name: 'Rank:', value: `${data[0].rank}`}, 
                        { name: 'League Points:', value: `${data[0].leaguePoints}`},
                        { name: 'Wins:', value: `${data[0].wins}`},
                        { name: 'Losses:', value: `${data[0].losses}`},
                        { name: 'Winrate:', value: `${Math.round((data[0].wins/(data[0].wins+data[0].losses))*100)}%`},
                    )
                    .setColor(rank2color(data[0].tier))
                    .setThumbnail(interaction.user.displayAvatarURL())
                    .setTimestamp();
                    return interaction.reply({embeds: [embed]});
                })
                .catch(err => {
                    return interaction.reply({content: `Error: ${err}`});
                })
            })
            .catch(err => {
                return interaction.reply({content: `Error: ${err}`});
            })
        },
};
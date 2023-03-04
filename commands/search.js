const {SlashCommandBuilder} = require("discord.js")
const {QueryType} = require("discord-player")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("do not use")
    .addStringOption(option => option
        .setName("songname")
        .setDescription("search song")
        .setRequired(true)
        ),
    async execute(interaction) {
        const query = interaction.options.getString("songname")
        const result = await interaction.client.player.search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })
        interaction.reply({content: `results:\n ${result.tracks.slice(0, 5).map((m, i) => `[${i + 1}. ${m.title}](${m.url})`).join("\n")}`})
    }
}
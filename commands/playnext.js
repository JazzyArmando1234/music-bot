
const { SlashCommandBuilder } = require("discord.js");
const {QueryType} = require("discord-player")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("playnext")
        .setDescription("song to play next right after the one is playing right now")
        .addStringOption(option => option
            .setName("name")
            .setDescription("name of song")
        ),
    async execute(interaction) {
        try{
        const queue = interaction.client.player.nodes.get(interaction.guild)

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: 'There is nothing playing' })
        }

        const query = interaction.options.getString("name")
        const searchResults = await interaction.client.player.search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })

        if (!searchResults || !searchResults.tracks.length) {
            return interaction.reply({ content: 'No results' })
        }

        queue.node.insert(searchResults.tracks[0])

        await interaction.reply("Successfully changed yhe order")

    }catch (error) {
        console.log(error)
    }
    }
}
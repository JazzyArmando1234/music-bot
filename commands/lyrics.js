const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { lyricsExtractor } = require("@discord-player/extractor")
const search = lyricsExtractor()
module.exports = {
    data: new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("song to search lyrics")
        .addStringOption(option => option
            .setName("name")
            .setDescription("name of song")
        ),
    async execute(interaction) {
        try{
        await interaction.deferReply("working")
        
        const queue = interaction.client.player.nodes.get(interaction.guild)
        const music = interaction.options.getString("name")
        if(!queue && !music) {
            return interaction.editReply({ content: "There is no queue and you didn't mention any song name!"})
        }

        if (queue || music) {
        const result = await search.search(music ?? queue.currentTrack.title)

        if (!result) {
            return interaction.editReply({ content: `No lyrics found for: ${music ? music : queue.currentTrack.title}` })
        } 

        const trimmedLyrics = result.lyrics.substring(0, 1997);

        const embed = new EmbedBuilder()
            .setTitle(`${result.title}`)
            .setThumbnail(`${result.thumbnail}`)
            .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
        await interaction.editReply({ embeds: [embed] })
    }
}catch (error) {
    console.log(error)
}
    }
}


    
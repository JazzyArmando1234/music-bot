const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("previous")
        .setDescription("play previous song"),
    async execute(interaction) {
        try{
        const queue = interaction.client.player.nodes.get(interaction.guild)


        if (!queue) {
            return interaction.reply({ content: "There is no queue" })
        }

        const lastSong = queue.history.previousTrack
        await queue.history.previous()
        return interaction.reply({ content: `Playing previous song, [${lastSong.title}](${lastSong.url})` })
    } catch (error) {
        console.log(error)
    }
    }
}
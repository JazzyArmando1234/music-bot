const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("skip current song"),
    async execute(interaction) {
        try{
        const queue = interaction.client.player.nodes.get(interaction.guild)

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: "There is nothing playing" })
        }

        const currentTrack = queue.current
        const success = queue.node.skip()
        return interaction.reply({ content: `Skipped ${queue.currentTrack}` })
    }catch (error) {
        console.log(error)
    }
    }

}
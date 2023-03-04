const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("pause the current track"),
    async execute(interaction) {
        try {
        const queue = interaction.client.player.nodes.get(interaction.guild)

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: "There is nothing playing", ephemeral: true })
        }

        const paused = queue.node.setPaused(true)
        return interaction.reply({ content: paused ? 'paused' : "something went wrong" })
    }catch (error) {
        console.log(error)
    }
}
}
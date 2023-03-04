const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("resume"),
    async execute(interaction) {
        try{
        const queue = interaction.client.player.nodes.get(interaction.guild)

        if (!queue || !queue.isPlaying()) {
            return interaction.reply("There is nothing playing")
        }

        const paused = queue.node.setPaused(false)
        return interaction.reply("resumed successfully")
    }catch (error) {
        console.log(error)
    }
}
}
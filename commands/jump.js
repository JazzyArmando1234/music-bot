const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("jump")
        .setDescription("jump to a specific song in the queue")
        .addIntegerOption(option => option
            .setName("value")
            .setDescription("number of the song")
            .setRequired(true)
        ),
    async execute(interaction) {
        try {

        const tracks = interaction.options.getInteger("value")
        const queue = interaction.client.player.nodes.get(interaction.guild)

        if (!queue) {
            return interaction.reply({ content: "There is no queue!" })
        }

        const trackIndex = tracks - 1;

        await queue.node.jump(trackIndex)

        return interaction.reply({ content: "Jumped successfully successfully!" })
    }catch (error) {
        console.log(error)
    }
}
}
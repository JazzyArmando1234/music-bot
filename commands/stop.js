const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("stop current queue"),
    async execute(interaction) {
        try{
        const queue = interaction.client.player.nodes.get(interaction.guild)

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: 'nothing playing', ephemeral: true })
        }

        interaction.client.player.nodes.delete(interaction.guild?.id);
        await interaction.reply("Queue stopped")
    }catch (error) {
        console.log(error)
    }
    }
}
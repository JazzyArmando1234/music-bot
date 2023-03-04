const { SlashCommandBuilder } = require("discord.js");

const {QueryType} = require("discord-player")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("shuffle the queue"),
    async execute(interaction) {
        try{
        const queue = interaction.client.player.nodes.get(interaction.guild)

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: "There is nothing in queue!", ephemeral: true })
        }

        await queue.tracks.shuffle();
        interaction.reply(`Queue shuffled`)

    }catch (error) {
        console.log(error)
    }
    }
}
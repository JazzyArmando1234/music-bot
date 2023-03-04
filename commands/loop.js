const { SlashCommandBuilder } = require("discord.js");
const { QueueRepeatMode } = require("discord-player")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("loop queue/track/autoplay")
        .addNumberOption(option => option
            .setName("select")
            .setDescription("select an option")
            .setRequired(true)
            .addChoices(
                { name: 'off', value: QueueRepeatMode.OFF },
                { name: "track", value: QueueRepeatMode.TRACK },
                { name: 'queue', value: QueueRepeatMode.QUEUE },
                { name: 'autoplay', value: QueueRepeatMode.AUTOPLAY }
            )
        ),
    async execute(interaction) {
        try {

        const queue = interaction.client.player.nodes.get(interaction.guild)

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: "There is no queue!" })
        }

        const loopMode = interaction.options.getNumber("select")

        queue.setRepeatMode(loopMode)
        const mode = loopMode === QueueRepeatMode.TRACK ? `🔂` : loopMode === QueueRepeatMode.QUEUE ? `🔂` : `▶`
        return interaction.reply({ content: `${mode} | Updated loop mode` })
    }catch (error) {
        console.log(error)
    }
    }
}
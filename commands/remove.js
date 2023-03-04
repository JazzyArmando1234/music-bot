const { SlashCommandBuilder, WebhookClient, ActivityType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const id = "1057302445065252904"
const token = "ksR9vCxRgEtevo4xUHkEsj1N0J02075LDWMiCQ_qtZZObmkU8nB-noah-uVTxfk5YXW5"
const webhook = new WebhookClient({ id: id, token: token })
const {QueryType} = require("discord-player")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove")
        .setDescription("remove a specific track from queue")
        .addIntegerOption(option => option
            .setName("number")
            .setDescription("the number from queue you want to remove ")
            .setRequired(true)
        ),
    async execute(interaction) {
        try {
        const queue = interaction.client.player.nodes.get(interaction.guild)

        if (!queue) {
            return interaction.reply({ content: "There is nothing playing", ephemeral: true })
        }

        const trackIndex = interaction.options.getInteger("number") - 1;
        //const trackName = queue.tracks[trackIndex].title;
        queue.node.remove(trackIndex)

        interaction.reply(`Removed`)

    }catch (error) {
        webhook.send(`${error}`)
        interaction.client.user.setPresence({activities: [{name: 'with bugs', type: ActivityType.Playing}], status: 'idle'})
        console.log(error)
    }
    }
}
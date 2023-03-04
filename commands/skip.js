const { SlashCommandBuilder, WebhookClient, ActivityType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const id = "1057302445065252904"
const token = "ksR9vCxRgEtevo4xUHkEsj1N0J02075LDWMiCQ_qtZZObmkU8nB-noah-uVTxfk5YXW5"
const webhook = new WebhookClient({ id: id, token: token })
const {QueryType} = require("discord-player")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("skip current song"),
    async execute(interaction) {
        try{
        const queue = interaction.client.player.nodes.get(interaction.guild)

        if (!queue || !queue.isPlaying()) {
            const results = new EmbedBuilder()
            .setTitle(`There is nothing playing`)
            .setColor(`#ff0000`)
            .setTimestamp()
            // finish if no tracks were found
            return interaction.reply({ embeds: [results] })
        }

        const currentTrack = queue.current
        const success = queue.node.skip()

        const yes = new EmbedBuilder()
        .setTitle(`Skipped ${queue.currentTrack}`)
        .setTimestamp()
        .setColor(`#00ff08`)
        return interaction.reply({embeds: [yes]})
    }catch (error) {
        webhook.send(`${error}`)
        interaction.client.user.setPresence({activities: [{name: 'with bugs', type: ActivityType.Playing}], status: 'idle'})
        console.log(error)
    }
    }

}
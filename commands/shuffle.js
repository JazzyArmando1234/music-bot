const { SlashCommandBuilder, WebhookClient, ActivityType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const id = "1057302445065252904"
const token = "ksR9vCxRgEtevo4xUHkEsj1N0J02075LDWMiCQ_qtZZObmkU8nB-noah-uVTxfk5YXW5"
const webhook = new WebhookClient({ id: id, token: token })

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
        webhook.send(`${error}`)
        interaction.client.user.setPresence({activities: [{name: 'with bugs', type: ActivityType.Playing}], status: 'idle'})
        console.log(error)
    }
    }
}
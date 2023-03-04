const { SlashCommandBuilder, WebhookClient, ActivityType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const id = "1057302445065252904"
const token = "ksR9vCxRgEtevo4xUHkEsj1N0J02075LDWMiCQ_qtZZObmkU8nB-noah-uVTxfk5YXW5"
const webhook = new WebhookClient({ id: id, token: token })
const {QueryType} = require("discord-player")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("set volume")
        .addIntegerOption(option => option
            .setName("number")
            .setDescription("number of volume")
        ),
    async execute(interaction) {
        try{
        if (interaction.user.id !== "650303709225549826") {
            return interaction.reply("for now only <@!650303709225549826> can use this")
        }
        const queue = interaction.client.player.nodes.get(interaction.guild)
        

        if (!queue || !queue.isPlaying()) {
            return interaction.reply("There is nothing playing")
        }

        const vol = parseInt(interaction.options.getInteger("number"))
        if (!vol) {
            return interaction.reply(`Current volume is ${queue.node.volume}`)
        }

        const success = queue.node.setVolume(vol)

        interaction.reply({ content: success ? `volume set to ${vol}` : "something went wrong" })
    }catch (error) {
        webhook.send(`${error}`)
        interaction.client.user.setPresence({activities: [{name: 'with bugs', type: ActivityType.Playing}], status: 'idle'})
        console.log(error)
    }
}
}
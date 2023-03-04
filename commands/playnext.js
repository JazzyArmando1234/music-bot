
const { SlashCommandBuilder, WebhookClient, ActivityType } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const id = "1057302445065252904"
const token = "ksR9vCxRgEtevo4xUHkEsj1N0J02075LDWMiCQ_qtZZObmkU8nB-noah-uVTxfk5YXW5"
const webhook = new WebhookClient({ id: id, token: token })
const {QueryType} = require("discord-player")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("playnext")
        .setDescription("song to play next right after the one is playing right now")
        .addStringOption(option => option
            .setName("name")
            .setDescription("name of song")
        ),
    async execute(interaction) {
        try{
        const queue = interaction.client.player.nodes.get(interaction.guild)

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: 'There is nothing playing' })
        }

        const query = interaction.options.getString("name")
        const searchResults = await interaction.client.player.search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })

        if (!searchResults || !searchResults.tracks.length) {
            return interaction.reply({ content: 'No results' })
        }

        queue.node.insert(searchResults.tracks[0])

        await interaction.reply("successfully changed order")

    }catch (error) {
        webhook.send(`${error}`)
        interaction.client.user.setPresence({activities: [{name: 'with bugs', type: ActivityType.Playing}], status: 'idle'})
        console.log(error)
    }


    }
}
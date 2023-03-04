const { SlashCommandBuilder } = require("discord.js");
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
        console.log(error)
    }
}
}
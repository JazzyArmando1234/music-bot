const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const {QueryType} = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("new play command")
    .addStringOption(option => option
        .setName("string")
        .setDescription("query")
        .setRequired(true))
        .addStringOption(option => option
            .setName("247")
            .setDescription("24/7")
            .addChoices(
                {name: "yes", value: "false"},
                {name: "no", value: "true"}
            )
        ),
    async execute(interaction) {
       try {
            const stri = interaction.options.getString("247")
            const check = interaction.options.getString("string")
            
           const result = await interaction.client.player.search(check, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })


        const results = new EmbedBuilder()
        .setTitle(`No results`)
        .setColor(`#ff0000`)
        .setTimestamp()

        if (!result.hasTracks()) {
            return interaction.reply({embeds: [results]})
        }

        await interaction.deferReply()
        await interaction.editReply({ content: `Loading a: ${result.playlist ? 'playlist' : 'track' }`})

        const yes = await interaction.client.player.play(interaction.member.voice.channel?.id, result, {
            nodeOptions: {
                metadata: {
                    channel: interaction.channel,
                    client: interaction.guild?.members.me,
                    requestedBy: interaction.user.username
                },
                volume: 20,
                bufferingTimeout: 3000,
            leaveOnEnd: stri === "false" ? false : true
              },
            
        })
        
        const embed = new EmbedBuilder()
        function yess() {
            const totalDurationMs = yes.track.playlist.tracks.reduce((a, c) => c.durationMS + a, 0)
            const totalDurationSec = Math.floor(totalDurationMs / 1000);
            const hours = Math.floor(totalDurationSec / 3600);
            const minutes = Math.floor((totalDurationSec % 3600) / 60);
            const seconds = totalDurationSec % 60;
            const durationStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            return durationStr
        }
        
        embed
            .setDescription(`${yes.track.playlist ? `**multiple tracks** from: **${yes.track.playlist.title}**` : `**${yes.track.title}**`}`)
            .setThumbnail(`${yes.track.playlist ? `${yes.track.playlist.thumbnail.url}` : `${yes.track.thumbnail}`}`)
            .setColor(`#00ff08`)
            .setTimestamp()
            .setFooter({ text: `Duration: ${yes.track.playlist ? `${yess()}` : `${yes.track.duration}`} | Event Loop Lag ${interaction.client.player.eventLoopLag.toFixed(0)}` })
            return interaction.editReply({ embeds: [embed ]})
        }catch (error) {
            console.log(error)
        }
    }
}























        /*try {
            await interaction.deferReply()
            const voice = new EmbedBuilder()
            .setTitle("You need to be in a Voice Channel to play a song.")
            .setColor(`#ff0000`)
            .setTimestamp()
            if (!interaction.member.voice.channel) {
                return interaction.editReply({ embeds: [voice] });
            }


            const stri = interaction.options.getString("247")
            const check = interaction.options.getString("string")
            // Create a play queue for the server
            const queue = await interaction.client.player.nodes.get(interaction.guild);

            // Wait until you are connected to the channel
            /*if (!queue || !queue.connection) {
                await queue.connect(interaction.member.voice.channel)
            }*/

            /*const embed = new EmbedBuilder()

            if (check.includes("playlist")) {
                if (check.includes("youtube")) {
                    // Search for the playlist using the discord-player
                
                const result = await interaction.client.player.search(check, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST
                })

                const playlists = new EmbedBuilder()
                .setTitle(`No playlist found with ${check}`)
                .setColor(`#ff0000`)
                .setTimestamp()
                if (result.tracks.length === 0) {
                    return interaction.editReply({ embeds: [playlists] })
                }
                if(queue) {
                    await queue.addTrack(result.tracks.forEach(song => console.log(song)))
                    return interaction.editReply({content: "added"})
                } else {
                // Add the tracks to the queue
                const playlist = result.playlist
                const yes = await interaction.client.player.play(interaction.member.voice.channel?.id, result, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        volume: 20
                      },
                    bufferingTimeout: 3000,
                })

                
                embed
                    .setDescription(`**${result.tracks.length} songs from [${yes.track.playlist.title}](${yes.track.playlist.url})** have been added to the Queue`)
                    .setThumbnail(`${yes.track.playlist.thumbnail}`)
                    .setTimestamp()
                    .setColor(`#00ff08`)
                }}

                if (check.includes("spotify.com/playlist")) {
                    // Search for the playlist using the discord-player
                
                const result = await interaction.client.player.search(check, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.SPOTIFY_PLAYLIST
                })

                const playlists = new EmbedBuilder()
                .setTitle(`No playlist found with ${check}`)
                .setColor(`#ff0000`)
                .setTimestamp()
                if (result.tracks.length === 0) {
                    return interaction.editReply({ embeds: [playlists] })
                }

                // Add the tracks to the queue
                const playlist = result.playlist
                if(queue) {
                    await queue.addTrack(result.tracks)
                    return interaction.editReply({content: "added"})
                } else {
                const yes = await interaction.client.player.play(interaction.member.voice.channel?.id, result, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        volume: 20
                      },
                    bufferingTimeout: 3000,
                })
                embed
                    .setDescription(`**${result.tracks.length} songs from [${yes.track.playlist.title}](${yes.track.playlist.url})** have been added to the Queue`)
                    .setThumbnail(`${yes.track.playlist.thumbnail}`)
                    .setTimestamp()
                    .setColor(`#00ff08`)
                }}


            } else if(check.startsWith("https://")) {
                if(check.includes("youtube.com") || check.includes("youtu.be")) {
                    // Search for the song using the discord-player
                const result = await interaction.client.player.search(check, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })


                const results = new EmbedBuilder()
                .setTitle(`No results`)
                .setColor(`#ff0000`)
                .setTimestamp()
                // finish if no tracks were found
                if (result.tracks.length === 0) {
                    return interaction.editReply({ embeds: [results] })
                }

                // Add the track to the queue
                const song = result.tracks[0]
                if(queue) {
                    await queue.addTrack(result.tracks[0])
                    return interaction.editReply({content: "added"})
                } else {

                const yes = await interaction.client.player.play(interaction.member.voice.channel?.id, result, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        volume: 20
                      },
                    bufferingTimeout: 3000,
                })
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration: ${song.duration}` })
                    .setTimestamp()
                    .setColor(`#00ff08`)
                }}

                if(check.includes("spotify.com")) {
                    // Search for the song using the discord-player
                        const result1 = await interaction.client.player.search(check, {
                            requestedBy: interaction.user,
                            searchEngine: QueryType.SPOTIFY_SONG
                        })
                        // Add the track to the queue
                    const song = result1.tracks[0]
                    const results = new EmbedBuilder()
                    .setTitle(`No results`)
                    .setColor(`#ff0000`)
                    .setTimestamp()
                    // finish if no tracks were found
                    if (result1.tracks.length === 0) {
                        return interaction.editReply({ embeds: [results] })
                    }

                    if(queue) {
                        await queue.addTrack(result1.tracks[0])
                        return interaction.editReply({content: "added"})
                    } else {
                    const yes = await interaction.client.player.play(interaction.member.voice.channel?.id, song, {
                        nodeOptions: {
                            metadata: {
                                channel: interaction.channel,
                                client: interaction.guild?.members.me,
                                requestedBy: interaction.user.username
                            },
                            volume: 20
                          },
                        bufferingTimeout: 3000,
                    })
                    embed
                        .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                        .setThumbnail(song.thumbnail)
                        .setFooter({ text: `Duration: ${song.duration}` })
                        .setTimestamp()
                        .setColor(`#00ff08`)
                }}}

                // Search for the song using the discord-player
                const result = await interaction.client.player.search(check, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO
                })
                console.log(result)
                const results = new EmbedBuilder()
                .setTitle(`No results`)
                .setColor(`#ff0000`)
                .setTimestamp()
                // finish if no tracks were found
                if (result.tracks.length === 0) {
                    return interaction.editReply({embeds: [results]})
                }

                // Add the track to the queue
                const song = result.tracks[0]
                
                if(queue) {
                    await queue.addTrack(result.tracks[0])
                    return interaction.editReply({content: "added"})
                } else {
                const yes = await interaction.client.player.play(interaction.member.voice.channel?.id, song, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        volume: 20
                      },
                    bufferingTimeout: 3000,
                })
               
                
                embed
                    .setDescription(`**[${yes.track.title}](${yes.track.url})** has been added to the Queue`)
                    .setThumbnail(`${yes.track.thumbnail}`)
                    .setColor(`#00ff08`)
                    .setTimestamp()
                    .setFooter({ text: `Duration: ${song.duration} | Event Loop Lag ${interaction.client.player.eventLoopLag.toFixed(0)}` })
                }

             // Play the song
             /*if (!queue.playing) {
                await queue.node.play()
                console.log(queue)
            }*/

            /*const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('SAVE')
					.setStyle(ButtonStyle.Primary),
			);

            const filter = i => i.customId === 'primary' && i.user.id === '650303709225549826';

            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

collector.on('collect', async i => {

    const tracks = queue.tracks.map(track => {
        return {
          title: track.title,
          author: track.author,
          url: track.url,
          thumbnail: track.thumbnail,
          duration: track.duration,
          views: track.views,
          requestedBy: interaction.user.username
        };
      });
    /*class Track {
        constructor({ title, author, url, thumbnail, duration, views, requestedBy }) {
            this.title = title;
            this.author = author;
            this.url = url;
            this.thumbnail = thumbnail;
            this.duration = duration;
            this.views = views;
            this.requestedBy = requestedBy;
        }
    }
    


    const playlist = []


    for (const tracks of queue) {
        playlist.push(new Track({
            title: tracks.title,
            author: tracks.author,
            url: tracks.url,
            thumbnail: tracks.thumbnail,
            duration: tracks.duration,
            views: tracks.views,
            requestedBy: interaction.user.username
        }))
    }

   /*const pressed = await db.set(`${interaction.user.username}`, tracks)
   //console.log()
   const get = await db.get(`${interaction.user.username}`)
   console.log(get)
	//i.update({ content: 'A button was clicked!', components: [] });
});

collector.on('end', collected => console.log(`Collected ${collected.size} items`));*/

            // Respond with the embed containing information about the player
            /*await interaction.editReply({
                embeds: [embed],
                //components: [row]
            })

        } catch (error) {
            webhook.send(`${error}`)
            interaction.client.user.setPresence({activities: [{name: 'with bugs', type: ActivityType.Playing}], status: 'idle'})
            console.log(error)
        }
    }
}*/
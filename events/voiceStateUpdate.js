const { Events, VoiceChannel } = require("discord.js");
const fs = require("fs");
const path = require("path");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  FFmpegOpusAudio,
} = require("@discordjs/voice");
const User = require("../models/user");
const wait = require("node:timers/promises").setTimeout;
let isPlaying = false;
const voiceStateUpdateController = async (oldState, newState) => {
  const oldChannel = oldState.channel;
  const newChannel = newState.channel;
  if (newState.member.user.bot) return;

  let theUser = newState.member.user;
  let theServer = newState.guild.id;

  let userDiscordId = theUser.id;

  const existingUser = await User.findOne({ discordId: userDiscordId });

  // Check if the user is already registered from the same server
  if (
    !existingUser ||
    !existingUser.registeredFromServers.includes(theServer)
  ) {
    console.log("User not registered");
    return;
  }

  if (!existingUser?.soundBoard) {
    console.log("No soundboard found for user");
    return;
  }

  // Log channel switches:
  if (oldState.channelId !== newState.channelId) {
    console.log(
      "Channel switch:",
      oldState.channelId ? oldState.channel.name : "No channel",
      "to",
      newState?.channel?.name
    );
  }

  if (!oldChannel && newChannel && !isPlaying) {
    console.log(
      `User ${newState.member.user.id} joined voice channel: ${newChannel.name}`
    );

    if (newChannel instanceof VoiceChannel) {
      const connection = joinVoiceChannel({
        channelId: newChannel.id,
        guildId: newChannel.guild.id,
        adapterCreator: newChannel.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        },
      });
      try {
        let usersSoundboard = existingUser.soundBoard;

        const filePath = `./resources/${
          usersSoundboard || "Tera baap aya"
        }.mp3`;
        const stream = fs.createReadStream(filePath);
        const resourceOfAudio = createAudioResource(stream);
        player.play(resourceOfAudio);
        connection.subscribe(player);
        isPlaying = true; // Set flag to indicate audio is playing
        console.log("===> the audio played");

        // Disconnect after the sound finishes playing (I might want to adjust this timing)
        player.on("idle", () => {
          connection?.destroy();
          isPlaying = false; // Reset flag when audio finishes playing
          console.log("===> the audio stopped");
        });
      } catch (error) {
        console.error("Error playing audio:", error);
        isPlaying = false; // Reset flag on error
      }
    }
  } else if (oldChannel && !newChannel) {
    console.log(`User ${newState.member.user.id} left voice channel`);
  }
};

module.exports = {
  name: Events.VoiceStateUpdate,
  async execute(oldState, newState) {
    await voiceStateUpdateController(oldState, newState);
  },
};

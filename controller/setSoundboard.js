const mongoose = require("mongoose");
const User = require("../models/user");
// const wait = require("node:timers/promises").setTimeout;
const setSoundboard = async (interaction) => {
  // Get the user details from the interaction object
  const user = interaction.user;
  const username = user.username;
  const avatar = user.avatar;
  const userId = user.id;
  const discriminator = user.discriminator;
  const globalName = user.globalName;

  // which server the user belongs to
  const registeringFrom = interaction.member.guild.id;

  const selectedSoundboard = interaction.options.getString("soundboard") ?? "";

  console.log("selectedSoundboard", selectedSoundboard);

  try {
    await interaction.deferReply();
    //
    // await wait(4_000);

    // Create a new user instance

    if (!user || !userId) {
      interaction.followUp("Error registering user");
      return;
    }

    // Check if a user with the same discordId exists
    const existingUser = await User.findOne({ discordId: userId });

    // Check if the user is already registered from the same server
    if (
      existingUser &&
      existingUser.registeredFromServers.includes(registeringFrom) &&
      existingUser.soundBoard === selectedSoundboard
    ) {
      interaction.followUp("This soundboard is already selected for you!");
      return;
    }

    if (
      existingUser &&
      existingUser.registeredFromServers.includes(registeringFrom) &&
      (!existingUser.soundBoard ||
        existingUser.soundBoard !== selectedSoundboard)
    ) {
      const updatedUser = await User.findByIdAndUpdate(
        existingUser._id,
        {
          soundBoard: selectedSoundboard,
        },
        { new: true }
      );

      if (updatedUser) {
        // Reply with the user details
        interaction.followUp("Your soundboard has been registered :)");
      }
      return;
    }

    const newUser = await User.create({
      discordId: userId,
      username: username,
      avatar: avatar,
      discriminator: discriminator,
      globalName: globalName,
      registeredFromServers: [
        ...(existingUser ? existingUser.registeredFromServers : []),
        registeringFrom,
      ],
      soundBoard: selectedSoundboard,
    });

    if (newUser) {
      // Reply with the user details
      interaction.followUp("Well well well, Now I know you :)");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    interaction.followUp("Error registering user");
  }
};

module.exports = {
  setSoundboard,
};

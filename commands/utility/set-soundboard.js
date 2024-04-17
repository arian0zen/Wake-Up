const { SlashCommandBuilder } = require("discord.js");
const { setSoundboard } = require("../../controller/setSoundboard");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-soundboard")
    .setDescription("This command will set soundboard for you!")
    .addStringOption((option) =>
      option
        .setName("soundboard")
        .setDescription("The soundboard to set")
        .setRequired(true)
        .addChoices(
          {
            name: "Buddy.. aapke father aayein hai",
            value: "Buddy.. Apke Father aye hain",
          },
          {
            name: "The Boys - Daddy´s Home",
            value: "The Boys - Daddy´s Home",
          },
          {
            name: "knock! knock! tera baap aya!",
            value: "knock! knock! tera baap aya!",
          },
          {
            name: "I am the one, who knocks",
            value: "I am the one, who knocks",
          }
        )
    ),

  async execute(interaction) {
    await setSoundboard(interaction);
  },
};

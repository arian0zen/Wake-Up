const { SlashCommandBuilder } = require("discord.js");
const { getUserDetails } = require("../../controller/getUsers");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hey")
    .setDescription("Say hey to the bot"),
  async execute(interaction) {
    await getUserDetails(interaction);
  },
};

const { SlashCommandBuilder } = require("discord.js");
const { registerUser } = require("../../controller/registerUser");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("This command will register you with the bot!"),
  async execute(interaction) {
    await registerUser(interaction);
  },
};

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("messageto")
    .setDescription(
      "This command will send a particular message to a selected channel!"
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to echo into")
        .setDescription("The channel to send the message to")
        .setRequired(true)
    ),

  async execute(interaction) {
    // let channel = interaction.options.getChannel("channel");
    // interaction.reply({
    //   content: "What message would you like to send?",
    //   ephemeral: true,
    // });
    // channel.send("Hello World");
    interaction.reply({
      content: "Not implemented yet!",
      ephemeral: true,
    });
  },
};

const getUserDetails = async (interaction) => {
  // Get the user details from the interaction object
  const user = interaction.user;
  const username = user.username;
  const userId = user.id;

  // Reply with the user details
  interaction.reply(`Username: ${username}, User ID: ${userId}`);
};

module.exports = {
  getUserDetails,
};

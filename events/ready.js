const { Events } = require("discord.js");
const connectDB = require("../config/connectDB");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    await connectDB(process.env.DATABASE_URI);
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};

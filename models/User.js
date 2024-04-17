const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    discordId: {
      type: String,
    },
    username: {
      type: String,
    },
    avatar: {
      type: String,
    },
    discriminator: {
      type: String,
    },
    globalName: {
      type: String,
    },
    registeredFromServers: {
      type: Array,
      default: [],
    },
    soundBoard: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

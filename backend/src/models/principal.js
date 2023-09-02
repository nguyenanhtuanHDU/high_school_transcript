const mongoose = require("mongoose");

const principalSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    publicKey: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

const Principal = mongoose.model("principal", principalSchema);

module.exports = Principal;

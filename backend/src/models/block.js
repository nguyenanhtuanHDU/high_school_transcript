const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema(
  {
    number: { type: String },
    teacherUsername: { type: String },
    principalUsername: { type: String },
    signature: {
      teacher: { type: String, required: true },
      principal: { type: String },
    },
    teacherPublicKey: { type: String },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    hashPrevBlock: String,
    isVerify: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Block = mongoose.model("block", blockSchema);

module.exports = Block;

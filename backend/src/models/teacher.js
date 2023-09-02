const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    // author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    publicKey: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("teacher", teacherSchema);

module.exports = Teacher;

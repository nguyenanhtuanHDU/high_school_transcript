const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    publicKey: { type: String, unique: true },
    roleSign: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("teacher", teacherSchema);

module.exports = Teacher;

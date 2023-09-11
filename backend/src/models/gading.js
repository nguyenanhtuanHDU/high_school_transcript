const mongoose = require("mongoose");

const gadingSchema = new mongoose.Schema(
  {
    studentID: { type: String, required: true },
    studentName: { type: String, required: true },
    math: { type: Number },
    literature: { type: Number },
    english: { type: Number },
    average: { type: Number },
    images: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Gading = mongoose.model("gading", gadingSchema);

module.exports = Gading;

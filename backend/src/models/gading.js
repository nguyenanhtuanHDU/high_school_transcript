const mongoose = require("mongoose");

const gadingSchema = new mongoose.Schema(
  {
    studentID: { type: String, required: true },
    subject: { type: String, required: true },
    yearStart: { type: Number, required: true },
    yearEnd: { type: Number, required: true },
    firstSemeter: { type: Number, required: true },
    secondSemeter: { type: Number, required: true },
    average: { type: Number, required: true },
    images: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

const Gading = mongoose.model("gading", gadingSchema);

module.exports = Gading;

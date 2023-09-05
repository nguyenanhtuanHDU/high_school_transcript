const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    birthday: { type: Date },
    teacherID: { type: mongoose.Schema.Types.ObjectId, ref: "teacher" },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("student", studentSchema);

module.exports = Student;

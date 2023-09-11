const Gading = require("../models/gading");
const Student = require("../models/student");
const Teacher = require("../models/teacher");

module.exports = {
  getListStudentByTeacherID: async (teacherID) => {
    try {
      const students = await Student.find({ teacherID }).sort({
        createdAt: -1,
      });
      return {
        message: "OK",
        data: students,
      };
    } catch (error) {
      return {
        message: "ERROR",
        data: null,
      };
    }
  },
  createSingleStudent: async (data) => {
    try {
      if (!data.teacherID) {
        return "Missing teacherID";
      }
      if (!data.fullName) {
        return "Missing fullName";
      }
      if (!data.birthday) {
        return "Missing birthday";
      }
      const teacher = await Teacher.findById(data.teacherID);
      if (!teacher) {
        return "Teacher not found";
      }
      const student = await Student.create(data);
      await Gading.create({
        studentID: student._id,
        studentName: student.fullName,
      });
      return "OK";
    } catch (error) {
      return "ERROR";
    }
  },
  editStudentByID: async (studentID, data) => {
    // console.log("🚀 ~ data:", data)
    console.log("🚀 ~ studentID:", studentID);
    try {
      const student = await Student.findById(studentID);
      if (!student) {
        console.log(student);
        return "Student not found";
      }
      if (!data.fullName) {
        return "Missing fullName";
      }
      if (!data.birthday) {
        return "Missing birthday";
      }
      const res = await Student.findByIdAndUpdate(studentID, data, {});

      console.log("🚀 ~ res:", res);
      // student.fullName = data.fullName;
      // student.birthday = data.birthday;
      await student.save();
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },

  deleteStudentByID: async (studentID) => {
    try {
      const student = await Student.findById(studentID);
      if (!student) {
        return "Student not found";
      }
      await Student.findByIdAndRemove(studentID);
      await Gading.deleteOne({ studentID });
      return "OK";
    } catch (error) {
      return "Student not found";
    }
  },
};

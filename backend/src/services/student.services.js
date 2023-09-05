const Student = require("../models/student");
const Teacher = require("../models/teacher");

module.exports = {
  getListStudentByTeacherID: async (teacherID) => {
    try {
      const students = await Student.find({ teacherID });
      return {
        message: "OK",
        data: students,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
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
      await Student.create(data);
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },
  editStudentByID: async (studentID, data) => {
    try {
      const student = await Student.findById(studentID);
      if (!student) {
        return "Student not found";
      }
      if (!data.fullName) {
        return "Missing fullName";
      }
      if (!data.birthday) {
        return "Missing birthday";
      }
      await Student.findByIdAndUpdate(studentID, data);
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "Student not found";
    }
  },

  deleteStudentByID: async (studentID) => {
    try {
      const student = await Student.findById(studentID);
      if (!student) {
        return "Student not found";
      }
      await Student.findByIdAndRemove(studentID);
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "Student not found";
    }
  },
};

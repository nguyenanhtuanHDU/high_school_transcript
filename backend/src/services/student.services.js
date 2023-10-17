const Gading = require("../models/gading");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const { deleteGadingById, editGadingByID } = require("./gading.services");

module.exports = {
  getAllStudents: async () => {
    const students = await Student.find();
    return students;
  },
  getListStudentByTeacherID: async (teacherID) => {
    console.log("🚀 ~ teacherID:", teacherID)
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
    console.log("🚀 ~ data:", data);
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
      await Student.findByIdAndUpdate(studentID, data);
      const studentEdit = await Student.findById(studentID);
      console.log("🚀 ~ studentEdit:", studentEdit.fullName);
      await Gading.findOneAndUpdate(
        { studentID },
        { studentName: studentEdit.fullName }
      );
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },

  editVerifyStudent: async (studentID, isSign) => {
    await Student.findByIdAndUpdate(studentID, { isSign });
  },
  deleteStudentByID: async (studentID) => {
    try {
      const student = await Student.findById(studentID);
      if (!student) {
        return "Student not found";
      }
      await Student.findByIdAndRemove(studentID);
      await deleteGadingById(studentID)
        .then((data) => {
          console.log("🚀 ~ data:", data);
        })
        .catch((err) => {
          console.log("🚀 ~ err:", err);
        });
      return "OK";
    } catch (error) {
      return "Student not found";
    }
  },
};

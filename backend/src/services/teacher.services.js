const Teacher = require("../models/teacher");
const { deleteFileKeyByUsername } = require("./file.services");
const { generateKeysPair, writePrivateKeyToFile } = require("./key.services");

module.exports = {
  findTeacherByID: async (teacherID) => {
    const teacher = await Teacher.findById(teacherID);
    if (!teacher) {
      return null;
    }
    return teacher;
  },
  getAllTeacher: async () => {
    const teachers = await Teacher.find();
    return teachers;
  },
  getTeacherByID: async (teacherID) => {
    const teacher = await Teacher.findById(teacherID);
    if (!teacher) {
      return null;
    } else {
      return teacher;
    }
  },
  createSingleTeacher: async (data) => {
    console.log("🚀 ~ data:", data);
    try {
      if (!data.username) {
        return "Missing username";
      }
      if (!data.password) {
        return "Missing passowrd";
      }
      if (!data.fullName) {
        return "Missing fullname";
      }
      const findByUsername = await Teacher.findOne({ username: data.username });
      if (findByUsername) {
        return "Username already exists";
      }
      const { publicKey, privateKey } = await generateKeysPair();
      data.publicKey = publicKey;
      writePrivateKeyToFile("teacher", data.username, privateKey);
      await Teacher.create(data);
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },
  toggleActiveTeacher: async (teacherID) => {
    try {
      const teacher = await Teacher.findById(teacherID);
      if (!teacher) {
        return {
          message: "Teacher not found",
        };
      }
      await Teacher.findByIdAndUpdate(teacherID, {
        isActive: !teacher.isActive,
      });
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },
  editTeacher: async (teacherID, data) => {
    console.log("🚀 ~ data:", data);
    const teacher = await Teacher.findById(teacherID);
    if (!teacher) {
      return {
        message: "Teacher not found",
      };
    }
    const res = await Teacher.findByIdAndUpdate(teacherID, data);
    console.log("🚀 ~ res:", res);
    return {
      message: "OK",
    };
  },
  deleteTeacherByID: async (teacherID) => {
    const teacher = await Teacher.findById(teacherID);
    if (!teacher) {
      return "Teacher not found";
    }
    await deleteFileKeyByUsername(teacher.username, "teachers");
    await Teacher.findByIdAndDelete(teacherID);
  },
};

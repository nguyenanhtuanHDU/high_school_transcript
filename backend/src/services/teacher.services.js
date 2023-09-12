const Teacher = require("../models/teacher");
const { generateKeysPair, writePrivateKeyToFile } = require("./key.services");

module.exports = {
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
        return "Missing password";
      }
      if (!data.fullName) {
        return "Missing fullName";
      }
      const findByUsername = await Teacher.findOne({ username: data.username });
      console.log("🚀 ~ findByUsername:", findByUsername);
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
};

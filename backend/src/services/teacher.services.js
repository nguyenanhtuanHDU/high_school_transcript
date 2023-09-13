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
        return "MISSING USERNAME";
      }
      if (!data.password) {
        return "MISSING PASSWORD";
      }
      if (!data.fullName) {
        return "MISSING FULLNAME";
      }
      const findByUsername = await Teacher.findOne({ username: data.username });
      if (findByUsername) {
        return "USERNAME ALREADY EXISTS";
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

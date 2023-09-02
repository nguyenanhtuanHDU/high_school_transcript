const Principal = require("../models/principal");
const Teacher = require("../models/teacher");

module.exports = {
  findUser: async (username, password) => {
    console.log("🚀 ~ username:", username)
    const teacher = await Teacher.findOne({ username });
    const principal = await Principal.findOne({ username });
    if (!teacher && !principal) {
      return "User not found";
    }
    const account = teacher || principal;
    console.log("🚀 ~ account:", account);
    if (account.password !== password) {
      return "Incorrect password";
    }
    return "OK";
  },
};

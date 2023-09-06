const Principal = require("../models/principal");
const Teacher = require("../models/teacher");

module.exports = {
  findUser: async (username, password) => {
    const teacher = await Teacher.findOne({ username });
    const principal = await Principal.findOne({ username });
    if (!teacher && !principal) {
      return {
        message: "User not found",
        data: null,
      };
    }
    const account = teacher || principal;
    if (account.password !== password) {
      return {
        message: "Incorrect password",
        data: null,
      };
    }
    return {
      message: "OK",
      data: account,
    };
  },
};

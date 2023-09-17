const Principal = require("../models/principal");
const Teacher = require("../models/teacher");

module.exports = {
  findUser: async (username, password) => {
    const teacher = await Teacher.findOne({ username });
    const principal = await Principal.findOne({ username });
    let type = "";
    if (teacher) {
      type = "TEACHER";
    }
    if (principal) {
      type = "PRINCIPAL";
    }
    if (!teacher && !principal) {
      return {
        message: "USER NOT FOUND",
        data: null,
      };
    }
    const account = teacher || principal;
    console.log("🚀 ~ account:", account)
    if (account.password !== password) {
      return {
        message: "INCORRECT PASSWORD",
        data: null,
      };
    }
    return {
      message: "OK",
      data: account,
      type,
    };
  },
};

const Admin = require("../models/admin");
const Principal = require("../models/principal");
const Teacher = require("../models/teacher");

module.exports = {
  findUser: async (username, password) => {
    const teacher = await Teacher.findOne({ username });
    const principal = await Principal.findOne({ username });
    const admin = await Admin.findOne({ username });
    let type = "";
    if (admin) {
      type = "ADMIN";
    }
    if (teacher) {
      type = "TEACHER";
    }
    if (principal) {
      type = "PRINCIPAL";
    }
    if (!teacher && !principal && !admin) {
      return {
        message: "User not found",
        data: null,
      };
    }
    if ((teacher && !teacher.isActive) || (principal && !principal.isActive)) {
      return {
        message: "User have not permission",
        data: null,
      };
    }
    const account = teacher || principal || admin;
    if (account.password !== password) {
      return {
        message: "Incorrect password",
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

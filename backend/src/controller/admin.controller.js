const { getListUsers, editRoleSign } = require("../services/admin.services");
const { findUser } = require("../services/auth.services");

module.exports = {
  getListUsers: async (req, res) => {
    try {
      const users = await getListUsers();
      res.status(200).json({
        message: "OK",
        data: users,
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json({
        EC: 1,
        message: "Server error",
      });
    }
  },
  editRoleSign: async (req, res) => {
    try {
      console.log(req.body);
      const { isSign, userID } = req.body;
      const payload = await editRoleSign(isSign, userID);
      if (payload == "OK") {
        res.status(200).json({
          message: "OK",
        });
      } else {
        res.status(400).json({
          message: payload,
        });
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json({
        EC: 1,
        message: "Server error",
      });
    }
  },
};

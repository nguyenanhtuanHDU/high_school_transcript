const { findUser } = require("../services/auth.services");

module.exports = {
  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("🚀 ~ req.body:", req.body)
      const message = await findUser(username, password);
      if (message === "OK") {
        res.status(200).json({
          status: "OK",
        });
      } else {
        res.status(404).json({
          message,
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

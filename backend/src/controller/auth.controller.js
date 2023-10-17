const { findUser } = require("../services/auth.services");

module.exports = {
  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;
      const payload = await findUser(username, password);
      if (payload.message === "OK") {
        res.cookie("type", payload.type);
        res.cookie("userSessionUsername", payload.data.username);
        res.cookie("userSessionID", payload.data._id.toString());
        if (payload.type !== "ADMIN") {
          res.cookie("userPK", payload.data.publicKey);
        }

        res.status(200).json({
          status: payload.message,
          data: payload.data,
          type: payload.type,
        });
      } else {
        res.status(404).json({
          message: payload.message,
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

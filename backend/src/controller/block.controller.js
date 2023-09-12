const { createBlockTemp } = require("../services/block.services");

module.exports = {
  createBlockTemp: async (req, res) => {
    try {
      const { teacherID } = req.query;
      const data = req.body;
      const payload = await createBlockTemp(data, teacherID);
      if (payload === "OK") {
        res.status(200).json({
          message: payload,
        });
      } else {
        res.status(400).json({
          EC: 1,
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
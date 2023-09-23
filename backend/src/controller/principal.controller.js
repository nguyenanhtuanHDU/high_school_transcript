const {
  createSinglePrincipal,
} = require("../services/principal.services");

module.exports = {
  postCreatePrincipal: async (req, res) => {
    try {
      const data = req.body;
      console.log("🚀 ~ data:", data)
      let message = await createSinglePrincipal(data);
      console.log("🚀 ~ message:", message)
      if (message === "OK") {
        res.status(200).json({
          EC: 0,
          message,
        });
      } else {
        res.status(400).json({
          EC: 1,
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

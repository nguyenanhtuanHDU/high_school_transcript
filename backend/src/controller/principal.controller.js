const {
  createSinglePrincipal,
  deletePrincipalByID,
  toggleActivePrincipal,
} = require("../services/principal.services");

module.exports = {
  postCreatePrincipal: async (req, res) => {
    try {
      const data = req.body;
      console.log("🚀 ~ data:", data);
      let message = await createSinglePrincipal(data);
      console.log("🚀 ~ message:", message);
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
  postToggleActivePrincipal: async (req, res) => {
    try {
      const { principalID } = req.params;
      let message = await toggleActivePrincipal(principalID);
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
  deletePrincipal: async (req, res) => {
    try {
      const { principalID } = req.params;
      await deletePrincipalByID(principalID);
      res.status(200).json({
        EC: 0,
        message: "OK",
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json({
        EC: 1,
        message: "Server error",
      });
    }
  },
};

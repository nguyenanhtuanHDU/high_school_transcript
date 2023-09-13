const {
  createBlockTemp,
  deleteBlockTempByID,
  getListBlocksTemp,
  updateBlockTempToBlock,
  getListBlocks,
} = require("../services/block.services");

module.exports = {
  getListBlocks: async (req, res) => {
    try {
      const listBlocks = await getListBlocks();
      res.status(200).json({
        data: listBlocks,
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json({
        EC: 1,
        message: "Server error",
      });
    }
  },
  getListBlockTemp: async (req, res) => {
    try {
      const listBlocks = await getListBlocksTemp();
      res.status(200).json({
        data: listBlocks,
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json({
        EC: 1,
        message: "Server error",
      });
    }
  },
  createBlockTemp: async (req, res) => {
    try {
      const { teacherID } = req.query;
      const data = {};
      data.data = req.body;
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

  createBlock: async (req, res) => {
    try {
      const { blockID } = req.params;
      const { principalID } = req.query;
      const payload = await updateBlockTempToBlock(blockID, principalID);
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

  deleteBlockTemp: async (req, res) => {
    try {
      const { blockID } = req.params;
      const payload = await deleteBlockTempByID(blockID);
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

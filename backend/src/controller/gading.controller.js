const {
  createSingleGading,
  deleteGadingById,
  getListGadingByTeacherID,
} = require("../services/gading.services");

module.exports = {
  getListGading: async (req, res) => {
    try {
      const { teacherID } = req.query;
      console.log("🚀 ~ teacherID:", teacherID);
      const payload = await getListGadingByTeacherID(teacherID);
      console.log("🚀 ~ payload:", payload);
      if (payload.message === "OK") {
        res.status(200).json({
          message: payload.message,
          data: payload.data,
        });
      } else {
        res.status(404).json({
          EC: 1,
          message: data.payload,
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
  postCreateGading: async (req, res) => {
    try {
      const data = req.body;
      const { images } = req.files;
      const payload = await createSingleGading(data, images);
      if (payload === "OK") {
        res.status(200).json({
          status: payload,
        });
      } else {
        res.status(404).json({
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
  // putUpdategading: async(req, res) => {
  //   const data = req.body
  // }

  deleteGading: async (req, res) => {
    const { gadingID } = req.params;
    console.log("🚀 ~ gadingID:", gadingID);
    const payload = await deleteGadingById(gadingID);
    console.log("🚀 ~ payload:", payload);
  },
};

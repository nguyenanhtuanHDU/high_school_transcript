const {
  createSingleGading,
  deleteGadingById,
  getListGadingByTeacherID,
  addPoint,
  changeImages,
} = require("../services/gading.services");

module.exports = {
  getListGading: async (req, res) => {
    try {
      const { teacherID } = req.query;
      const payload = await getListGadingByTeacherID(teacherID);
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
  putAddPoint: async (req, res) => {
    try {
      let payload = "";
      const data = JSON.parse(req.body.data);
      const { type } = data;
      let images;
      if (req.files?.images) {
        images = req.files.images;
        if (!images.length) {
          images = [images];
        }
      }

      console.log("🚀 ~ images:", images);

      if (type === "CHANGE_IMAGES") {
        console.log(">>> CHANGE_IMAGES");
        const imagesDelete = JSON.parse(req.body.imagesDelete);
        console.log("🚀 ~ imagesDelete:", imagesDelete);
        payload = await changeImages(data, imagesDelete, images);
      } else {
        console.log(">>> NO CHANGE_IMAGES");
        payload = await addPoint(data, images);
      }
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
  deleteGading: async (req, res) => {
    try {
      const { gadingID } = req.params;
      const payload = await deleteGadingById(gadingID);
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

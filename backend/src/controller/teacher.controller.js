const {
  createSingleTeacher,
  deleteTeacherByID,
} = require("../services/teacher.services");

module.exports = {
  postCreateTeacher: async (req, res) => {
    try {
      const data = req.body;
      let message = await createSingleTeacher(data);
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
  deleteTeacher: async (req, res) => {
    try {
      const { teacherID } = req.params;
      await deleteTeacherByID(teacherID);
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

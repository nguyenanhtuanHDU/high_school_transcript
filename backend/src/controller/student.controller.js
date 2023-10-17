const {
  createSingleStudent,
  editStudentByID,
  deleteStudentByID,
  getListStudentByTeacherID,
  getNumberOfStudent,
} = require("../services/student.services");

module.exports = {
  getListStudent: async (req, res) => {
    try {
      const { teacherID } = req.query;
      const payload = await getListStudentByTeacherID(teacherID);
      console.log("🚀 ~ payload:", payload);
      if (!payload.data) {
        res.status(404).json({
          EC: 1,
          message: payload.message,
        });
      }
      res.status(200).json({
        EC: 0,
        message: payload.message,
        data: payload.data,
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json({
        EC: 1,
        message: "Server error",
      });
    }
  },

  getNumberOfStudent: async (req, res) => {
    try {
      const countStudent = await getNumberOfStudent();
      res.status(200).json({
        EC: 0,
        message: "OK",
        data: countStudent,
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json({
        EC: 1,
        message: "Server error",
      });
    }
  },
  postCreateStudent: async (req, res) => {
    try {
      const data = req.body;
      let message = await createSingleStudent(data);
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
  putUpdateStudent: async (req, res) => {
    try {
      const data = req.body;
      console.log("🚀 ~ data:", data);
      const { studentID } = req.params;
      const message = await editStudentByID(studentID, data);
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
  deleteSingleStudent: async (req, res) => {
    try {
      const { studentID } = req.params;
      const message = await deleteStudentByID(studentID);
      res.status(200).json({
        message,
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

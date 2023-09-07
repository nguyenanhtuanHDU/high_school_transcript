const Gading = require("../models/gading");
const Student = require("../models/student");
const path = require("path");
const Teacher = require("../models/teacher");

module.exports = {
  getListGadingByTeacherID: async (teacherID) => {
    try {
      const teacher = await Teacher.findById(teacherID);
      if (!teacher) {
        return {
          data: null,
          message: "Teacher not found",
        };
      }
      let listStudentID = [];

      await Student.find({ teacherID }, "_id")
        .then((results) => {
          listStudentID = results.map((result) => result._id);
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
      let data = [];

      await Gading.find({
        studentID: { $in: listStudentID },
      })
        .then((res) => {
          data = res;
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
      console.log("🚀 ~ data:", data);
      return {
        message: "OK",
        data,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },
  createSingleGading: async (data, images) => {
    try {
      const imagesData = [];
      if (!data.studentID) {
        return "Missing studentID";
      }
      if (!data.subject) {
        return "Missing subject";
      }
      if (!data.yearStart) {
        return "Missing yearStart";
      }
      if (!data.yearEnd) {
        return "Missing yearEnd";
      }
      if (!data.firstSemeter) {
        return "Missing firstSemeter";
      }
      if (!data.secondSemeter) {
        return "Missing secondSemeter";
      }
      if (!images || Object.keys(images).length === 0) {
        return res.status(400).send("No files were uploaded.");
      }
      try {
        await Student.findById(data.studentID);
      } catch (error) {
        console.log("🚀 ~ error:", error);
        return "Student not found";
      }
      const student = await Gading.findOne({ studentID: data.studentID });
      if (student) {
        return "Student already exists";
      }
      const average =
        (parseFloat(data.firstSemeter) + parseFloat(data.secondSemeter)) / 2;
      images.map((image, index) => {
        fileName = data.studentID + "-" + (Date.now() + index);
        imagesData.push(fileName);
        uploadPath =
          path.join("./src", "public/images/") +
          fileName +
          path.extname(image.name);
        image.mv(uploadPath, function (err) {
          if (err) return "Upload file error";
        });
      });
      data.images = imagesData;
      data.average = average.toFixed(1);

      await Gading.create(data);
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },
  deleteGadingById: async (gadingId) => {
    try {
      const gading = await Gading.findByIdAndDelete(gadingId);
      if (!gading) {
        return "Gading not found";
      }
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },
};

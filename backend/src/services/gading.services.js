const Gading = require("../models/gading");
const Student = require("../models/student");
const path = require("path");
const Teacher = require("../models/teacher");
const fs = require("fs");
const { deleteListFiles } = require("./file.services");

const caculatePoint = (a, b, c) => {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const numC = parseFloat(c);
  const total = numA + numB + numC;
  return (total / 3).toFixed(1);
};

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
  addPoint: async (data, images) => {
    try {
      if (!data.math) {
        return "MISSING MATH";
      }
      if (!data.literature) {
        return "MISSING LITERATURE";
      }
      if (!data.english) {
        return "MISSING ENGLISH";
      }
      const imagesData = [];
      images && images.length > 0 && images.map((image, index) => {
        fileName = data._id + "-" + (Date.now() + index);
        imagesData.push(fileName + path.extname(image.name));
        uploadPath =
          path.join("./src", "public/images/") +
          fileName +
          path.extname(image.name);
        image.mv(uploadPath, function (err) {
          if (err) return "UPLOAD FILE ERROR";
        });
      });
      const average = caculatePoint(data.math, data.literature, data.english);
      data.images = [...data.images, ...imagesData];
      data.average = average;
      await Gading.findByIdAndUpdate(data._id, data);
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },

  changeImages: async (data, imagesDelete, images) => {
    const gading = await Gading.findById(data._id);
    if (!gading) {
      return "GADING NOT FOUND";
    }

    // delete images
    const imagesDB = [...gading.images];
    imagesDelete.map(async (img, index) => {
      if (imagesDB.includes(img)) {
        imagesDB.splice(index, 1);
        fs.unlink("./src/public/images/" + img, function (err) {
          if (err) {
            console.log("🚀 ~ err:", err);
            return "FILE TO DELETE NOT FOUND";
          }
        });
        await Gading.findByIdAndUpdate(
          data._id,
          {
            $pull: { images: img },
          },
          { new: true }
        )
          .then((data) => {
            console.log("🚀 ~ data:", data);
          })
          .catch((err) => {
            console.log("🚀 ~ err:", err);
          });
      }
    });

    // add new images
    if (images && images.length > 0) {
      const imagesData = [];
      images.map((image, index) => {
        fileName = data._id + "-" + (Date.now() + index);
        imagesData.push(fileName + path.extname(image.name));
        uploadPath =
          path.join("./src", "public/images/") +
          fileName +
          path.extname(image.name);
        image.mv(uploadPath, function (err) {
          if (err) return "UPLOAD FILE ERROR";
        });
      });
      data.images = [...data.images, ...imagesData];
    }
    const average = caculatePoint(data.math, data.literature, data.english);
    data.average = average;
    await Gading.findByIdAndUpdate(data._id, data);
    return "OK";
  },
  editGadingByID: async (gadingID, data) => {
    try {
      const gading = await Gading.findById(gadingID);
      if (!gading) {
        return "GADING NOT FOUND";
      }
      await Gading.findByIdAndUpdate(gadingID, data);
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },
  deleteGadingById: async (studentID) => {
    try {
      const gading = await Gading.findOne({ studentID });
      if (!gading) {
        return "Gading not found";
      }
      await deleteListFiles(gading.images);
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },
};

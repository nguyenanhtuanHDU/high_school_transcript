const express = require("express");
const { postCreateTeacher } = require("../controller/teacher.controller");
const { postCreatePrincipal } = require("../controller/principal.controller");
const {
  postCreateStudent,
  putUpdateStudent,
  deleteSingleStudent,
  getListStudent,
} = require("../controller/student.controller");
const { postCreateGading, deleteGading, getListGading } = require("../controller/gading.controller");

const router = express.Router();

router.post("/teacher", postCreateTeacher);

router.post("/principal", postCreatePrincipal);

router.get("/students", getListStudent);
router.post("/student", postCreateStudent);
router.put("/student/:studentID", putUpdateStudent);
router.delete("/student/:studentID", deleteSingleStudent);

router.get("/gading/gadings", getListGading);
router.post("/gading", postCreateGading);
router.delete("/gading/:gadingID", deleteGading);

module.exports = router;

const express = require("express");
const { postCreateTeacher } = require("../controller/teacher.controller");
const { postCreatePrincipal } = require("../controller/principal.controller");
const {
  postCreateStudent,
  putUpdateStudent,
  deleteSingleStudent,
  getListStudent,
} = require("../controller/student.controller");
const { postCreateGading, deleteGading, getListGading, putAddPoint } = require("../controller/gading.controller");
const { createBlockTemp } = require("../controller/block.controller");

const router = express.Router();

router.post("/teacher", postCreateTeacher);

router.post("/principal", postCreatePrincipal);

router.get("/students", getListStudent);
router.post("/student", postCreateStudent);
router.put("/student/:studentID", putUpdateStudent);
router.delete("/student/:studentID", deleteSingleStudent);

router.get("/gading/gadings", getListGading);
router.post("/gading", postCreateGading);
router.put("/gading", putAddPoint);
router.delete("/gading/:gadingID", deleteGading);

router.post("/block/temp", createBlockTemp);

module.exports = router;

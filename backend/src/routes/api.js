const express = require("express");
const { postCreateTeacher } = require("../controller/teacher.controller");
const { postCreatePrincipal } = require("../controller/principal.controller");
const {
  postCreateStudent,
  putUpdateStudent,
  deleteSingleStudent,
  getListStudent,
} = require("../controller/student.controller");

const router = express.Router();

router.post("/teacher", postCreateTeacher);

router.post("/principal", postCreatePrincipal);

router.get("/students", getListStudent);
router.post("/student", postCreateStudent);
router.put("/student/:studentID", putUpdateStudent);
router.delete("/student/:studentID", deleteSingleStudent);

module.exports = router;

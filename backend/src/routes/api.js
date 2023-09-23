const express = require("express");
const { postCreateTeacher } = require("../controller/teacher.controller");
const { postCreatePrincipal } = require("../controller/principal.controller");
const {
  postCreateStudent,
  putUpdateStudent,
  deleteSingleStudent,
  getListStudent,
} = require("../controller/student.controller");
const {
  postCreateGading,
  deleteGading,
  getListGading,
  putAddPoint,
  getSingleGading,
} = require("../controller/gading.controller");
const {
  createBlockTemp,
  deleteBlockTemp,
  getListBlockTemp,
  createBlock,
  getListBlocks,
  getNumberOfUSer,
} = require("../controller/block.controller");

const router = express.Router();

router.post("/teacher", postCreateTeacher);

router.post("/principal", postCreatePrincipal);

router.get("/students", getListStudent);
router.post("/student", postCreateStudent);
router.put("/student/:studentID", putUpdateStudent);
router.delete("/student/:studentID", deleteSingleStudent);

router.get("/gading/:studentID", getSingleGading);
router.get("/gading/gadings", getListGading);
router.post("/gading", postCreateGading);
router.put("/gading", putAddPoint);
router.delete("/gading/:gadingID", deleteGading);

router.get("/block/list", getListBlocks);
router.get("/block/users", getNumberOfUSer);
router.put("/block/:blockID", createBlock);

router.get("/block/temp/list", getListBlockTemp);
router.post("/block/temp", createBlockTemp);
router.delete("/block/temp/:blockID", deleteBlockTemp);

module.exports = router;

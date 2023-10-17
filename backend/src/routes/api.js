const express = require("express");
const {
  postCreateTeacher,
  deleteTeacher,
} = require("../controller/teacher.controller");
const {
  postCreatePrincipal,
  deletePrincipal,
} = require("../controller/principal.controller");
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
const {
  getListUsers,
  editRoleSign,
} = require("../controller/admin.controller");
const { verifyAdmin } = require("../middleware/admin");
const {
  verifyRoleSign,
  verifyDeleteBlockTemp,
} = require("../middleware/block");

const router = express.Router();

router.get("/admin/users", getListUsers);
router.post("/admin/users/role-sign", verifyAdmin, editRoleSign);

router.post("/teacher", postCreateTeacher);
router.delete("/teacher/:teacherID", verifyAdmin, deleteTeacher);

router.post("/principal", postCreatePrincipal);
router.delete("/principal/:principalID", verifyAdmin, deletePrincipal);

router.get("/students", getListStudent);
router.post("/student", postCreateStudent);
router.put("/student/:studentID", putUpdateStudent);
router.delete("/student/:studentID", deleteSingleStudent);

router.get("/gading/find/:studentID", getSingleGading);
router.get("/gading/gadings", getListGading);
router.post("/gading", postCreateGading);
router.put("/gading", putAddPoint);
router.delete("/gading/:gadingID", deleteGading);

router.get("/block/list", getListBlocks);
router.get("/block/users", getNumberOfUSer);
router.put("/block/:blockID", verifyRoleSign, createBlock);

router.get("/block/temp/list", getListBlockTemp);
router.post("/block/temp", verifyRoleSign, createBlockTemp);
router.delete("/block/temp/:blockID", verifyDeleteBlockTemp, deleteBlockTemp);

module.exports = router;

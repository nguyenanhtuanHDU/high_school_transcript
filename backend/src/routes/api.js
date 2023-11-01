const express = require("express");
const {
  postCreateTeacher,
  deleteTeacher,
  postActiveTeacher,
  postToggleActiveTeacher,
} = require("../controller/teacher.controller");
const {
  postCreatePrincipal,
  deletePrincipal,
  postToggleActivePrincipal,
} = require("../controller/principal.controller");
const {
  postCreateStudent,
  putUpdateStudent,
  deleteSingleStudent,
  getListStudent,
  getNumberOfStudent,
  getAllStudent,
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
const { verifyAdmin, verifyAdminOrPrincipal } = require("../middleware/admin");
const {
  verifyRoleSign,
  verifyDeleteBlockTemp,
} = require("../middleware/block");
const Teacher = require("../models/teacher");
const Principal = require("../models/principal");

const router = express.Router();

router.post("/all", async (req, res) => {
  await Teacher.updateMany({}, { isActive: true });
  await Principal.updateMany({}, { isActive: true });
  res.send("OK");
});

router.get("/admin/users", getListUsers);
router.post("/admin/users/role-sign", verifyAdminOrPrincipal, editRoleSign);

router.post("/teacher", postCreateTeacher);
router.post(
  "/teacher/active/:teacherID",
  verifyAdminOrPrincipal,
  postToggleActiveTeacher
);
router.delete("/teacher/:teacherID", verifyAdmin, deleteTeacher);

router.post("/principal", postCreatePrincipal);
router.post(
  "/principal/active/:principalID",
  verifyAdmin,
  postToggleActivePrincipal
);
router.delete("/principal/:principalID", verifyAdmin, deletePrincipal);

router.get("/students/all", verifyAdmin, getAllStudent);
router.get("/students", getListStudent);
router.get("/students/count", getNumberOfStudent);
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
// router.put("/block/:blockID", verifyRoleSign, createBlock);

router.get("/block/temp/list", getListBlockTemp);
// router.post("/block/temp", verifyRoleSign, createBlockTemp);
// router.delete("/block/temp/:blockID", verifyDeleteBlockTemp, deleteBlockTemp);

module.exports = router;

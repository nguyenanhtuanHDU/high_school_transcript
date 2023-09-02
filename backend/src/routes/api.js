const express = require("express");
const { postCreateTeacher } = require("../controller/teacher.controller");

const router = express.Router();

router.post("/teacher", postCreateTeacher);

module.exports = router;

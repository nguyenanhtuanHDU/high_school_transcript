const { getBlockByID } = require("../services/block.services");
const { getPrincipalByID } = require("../services/principal.services");
const { findTeacherByID } = require("../services/teacher.services");

module.exports = {
  verifyRoleSign: async (req, res, next) => {
    const { type, userSessionID } = req.cookies;
    console.log("🚀 ~ type:", type);
    if (type === "TEACHER") {
      const teacher = await findTeacherByID(userSessionID);
      if (!teacher.roleSign) {
        res.status(403).json({
          message: "You have not permission",
        });
      } else {
        next();
      }
    }

    if (type === "PRINCIPAL") {
      const principal = await getPrincipalByID(userSessionID);
      if (!principal.roleSign) {
        res.status(403).json({
          message: "You have not permission",
        });
      } else {
        next();
      }
    }
  },
  verifyDeleteBlockTemp: async (req, res, next) => {
    const { type, userSessionUsername } = req.cookies;
    const { blockID } = req.params;
    const block = await getBlockByID(blockID);
    if (block.teacherUsername === userSessionUsername || type === "ADMIN") {
      next();
    } else {
      res.status(403).json({
        message: "You have not permission",
      });
    }
  },
};

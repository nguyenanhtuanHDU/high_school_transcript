const Admin = require("../models/admin");
const Principal = require("../models/principal");

module.exports = {
  verifyAdmin: async (req, res, next) => {
    const { type, userSessionID } = req.cookies;
    const admin = await Admin.findById(userSessionID);

    if (admin && type === "ADMIN") {
      next();
    } else {
      res.status(403).json({
        message: "You have not permission",
      });
    }
  },
  verifyAdminOrPrincipal: async (req, res, next) => {
    const { type, userSessionID } = req.cookies;
    const admin = await Admin.findById(userSessionID);
    const principal = await Principal.findById(userSessionID);

    if ((admin && type === "ADMIN") || (principal && type === "PRINCIPAL")) {
      next();
    } else {
      res.status(403).json({
        message: "You have not permission",
      });
    }
  },
};

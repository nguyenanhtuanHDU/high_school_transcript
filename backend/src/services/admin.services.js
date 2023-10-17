const {
  getAllPrincipal,
  getPrincipalByID,
  editPrincipal,
} = require("./principal.services");
const {
  getAllTeacher,
  findTeacherByID,
  editTeacher,
} = require("./teacher.services");

module.exports = {
  getListUsers: async () => {
    const principals = await getAllPrincipal();
    const teachers = await getAllTeacher();

    return {
      principals,
      teachers,
    };
  },
  editRoleSign: async (isSign, userID) => {
    const teacher = await findTeacherByID(userID);
    const principal = await getPrincipalByID(userID);

    if (!teacher && !principal) {
      return "User not found";
    }

    if (teacher) {
      await editTeacher(userID, { roleSign: !isSign });
    }

    if (principal) {
      await editPrincipal(userID, { roleSign: !isSign });
    }
    return "OK";
  },
};

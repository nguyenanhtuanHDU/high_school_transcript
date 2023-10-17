const fs = require("fs");

module.exports = {
  deleteListFiles: async (files) => {
    for (const file of files) {
      const filePath = "./src/public/images/" + file;
      await fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Delete failed", err);
        } else {
          console.log("Delete success");
        }
      });
    }
  },
  deleteFileKeyByUsername: async (username, type) => {
    console.log("🚀 ~ type:", type);
    if (type !== "principal" && type !== "teachers") {
      console.error("Delete failed because type not true");
      return;
    }
    const filePath = "./src/private-keys/" + type + "/" + username + ".pem";
    console.log("🚀 ~ filePath:", filePath);
    await fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Delete failed", err);
      } else {
        console.log("Delete success");
      }
    });
  },
};

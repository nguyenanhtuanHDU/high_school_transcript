const fs = require("fs");

module.exports = {
  deleteListFiles: async (files) => {
    for (const file of files) {
      const filePath = "./src/public/images/" + file;
      await fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Xoá tập tin không thành công:", err);
        } else {
          console.log("Tập tin đã được xoá thành công");
        }
      });
    }
  },
};

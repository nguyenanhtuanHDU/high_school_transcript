const Teacher = require("../models/teacher");
const crypto = require("crypto");
const fs = require("fs");

module.exports = {
  createSingleTeacher: async (data) => {
    console.log("🚀 ~ data:", data);
    try {
      if (!data.username) {
        return "Missing username";
      }
      if (!data.password) {
        return "Missing password";
      }
      if (!data.fullName) {
        return "Missing fullName";
      }
      const findByUsername = await Teacher.findOne({ username: data.username });
      console.log("🚀 ~ findByUsername:", findByUsername);
      if (findByUsername) {
        return "Username already exists";
      }
      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      });
      data.publicKey = publicKey;
      // console.log("🚀 ~ data:", data);
      fs.writeFileSync(
        "./src/private-keys/" + data.username + ".pem",
        privateKey
      );
      await Teacher.create(data);

      // const dataToSign = "Hello, world!";
      // // Tạo chữ ký bằng khóa riêng tư
      // const sign = crypto.createSign("RSA-SHA256");
      // sign.update(dataToSign);
      // const signature = sign.sign(privateKey, "base64");

      // // Xác minh chữ ký bằng khóa công khai
      // const verify = crypto.createVerify("RSA-SHA256");
      // verify.update(dataToSign);
      // const isVerified = verify.verify(publicKey, signature, "base64");

      // console.log("Dữ liệu:", dataToSign);
      // console.log("Chữ ký:", signature);
      // console.log("Chữ ký đã được xác minh:", isVerified);

      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },
};

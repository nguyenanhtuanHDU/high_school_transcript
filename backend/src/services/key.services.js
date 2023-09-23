const crypto = require("crypto");
const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

module.exports = {
  generateKeysPair: async () => {
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
    return { publicKey, privateKey };
  },

  writePrivateKeyToFile: async (type, username, privateKey) => {
    if (type === "teacher") {
      fs.writeFileSync(
        "./src/private-keys/teachers/" + username + ".pem",
        privateKey
      );
    } else if (type === "principal") {
      fs.writeFileSync(
        "./src/private-keys/principal/" + username + ".pem",
        privateKey
      );
    }
  },

  getPrivateKey: async (username, duty) => {
    let payload = "";
    if (duty !== "teachers" && duty !== "principal") {
      payload = "ERROR DUTY";
    } else {
      try {
        const data = await readFileAsync(
          `./src/private-keys/${duty}/${username}.pem`,
          "utf8"
        );
        payload = data;
      } catch (err) {
        console.log("🚀 ~ err:", err);
        payload = "ERROR";
      }
    }
    return payload;
  },

  createSign: async (privateKey, data) => {
    // Tạo một đối tượng dùng để tạo chữ ký với thuật toán RSA-SHA256
    const sign = crypto.createSign("RSA-SHA256");
    // Cập nhật đối tượng chữ ký với dữ liệu đầu vào, dữ liệu được chuyển thành dạng chuỗi
    sign.update(JSON.stringify(data));
    // Tạo chữ ký bằng cách sử dụng khóa bí mật và mã hóa kết quả dưới định dạng base64
    const signature = sign.sign(privateKey, "base64");
    // Trả về chữ ký đã tạo
    return signature;
  },

  compareSign: async (data, publicKey, signature) => {
    const verify = crypto.createVerify("RSA-SHA256");
    verify.update(JSON.stringify(data));
    const isVerified = verify.verify(publicKey, signature, "base64");
    return isVerified;
  },
};

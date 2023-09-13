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

  demoSignature: () => {
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
    const sign = crypto.createSign("RSA-SHA256");
    sign.update(JSON.stringify(data));
    const signature = sign.sign(privateKey, "base64");
    return signature;
  },

  compareSign: async (data, publicKey, signature) => {
    const verify = crypto.createVerify("RSA-SHA256");
    verify.update(JSON.stringify(data));
    const isVerified = verify.verify(publicKey, signature, "base64");
    if (isVerified) {
      return true;
    }
    return false;
  },
};

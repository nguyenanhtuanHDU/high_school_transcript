const Principal = require("../models/principal");
const { generateKeysPair, writePrivateKeyToFile } = require("./key.services");

module.exports = {
  createSinglePrincipal: async (data) => {
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
      const listPrincipals = await Principal.find();
      if (listPrincipals.length > 0) {
        return "Reaching the limit on the number of principals";
      }
      const { publicKey, privateKey } = await generateKeysPair();
      data.publicKey = publicKey;
      writePrivateKeyToFile("principal", data.username, privateKey);
      await Principal.create(data);
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },
};

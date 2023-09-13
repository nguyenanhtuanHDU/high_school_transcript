const Principal = require("../models/principal");
const { generateKeysPair, writePrivateKeyToFile } = require("./key.services");

module.exports = {
  getPrincipal: async () => {
    const listPrincipals = await Principal.find();
    return listPrincipals[0];
  },
  getPrincipalByID: async (principalID) => {
    const principal = await Principal.findById(principalID);
    return principal;
  },
  createSinglePrincipal: async (data) => {
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

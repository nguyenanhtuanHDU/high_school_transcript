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
        return "MISSING USERNAME";
      }
      if (!data.password) {
        return "MISSING PASSWORD";
      }
      if (!data.fullName) {
        return "MISSING FULLNAME";
      }
      const listPrincipals = await Principal.find();
      if (listPrincipals.length > 0) {
        return "LIMIT NUMBER OF PRINCIPALS";
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

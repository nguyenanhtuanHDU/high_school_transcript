const Principal = require("../models/principal");
const { deleteFileKeyByUsername } = require("./file.services");
const { generateKeysPair, writePrivateKeyToFile } = require("./key.services");

module.exports = {
  getAllPrincipal: async () => {
    const listPrincipals = await Principal.find();
    return listPrincipals;
  },
  getPrincipal: async () => {
    const listPrincipals = await Principal.find();
    return listPrincipals[0];
  },
  getPrincipalByID: async (principalID) => {
    const principal = await Principal.findById(principalID);
    if (!principal) {
      return null;
    }
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
        return "Missing fullname";
      }
      const listPrincipals = await Principal.find();
      if (listPrincipals.length > 0) {
        return "Limit number of principal";
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
  toggleActivePrincipal: async (principalID) => {
    try {
      const principal = await Principal.findById(principalID);
      if (!principal) {
        return "Principal not found";
      }
      await Principal.findByIdAndUpdate(principalID, {
        isActive: !principal.isActive,
      });
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  },
  editPrincipal: async (principalID, data) => {
    const principal = await Principal.findById(principalID);
    if (!principal) {
      return {
        message: "Principal not found",
      };
    }
    await Principal.findByIdAndUpdate(principalID, data);
    return {
      message: "OK",
    };
  },
  deletePrincipalByID: async (principalID) => {
    const principal = await Principal.findById(principalID);
    await deleteFileKeyByUsername(principal.username, "principal");
    await Principal.findByIdAndDelete(principalID);
  },
};

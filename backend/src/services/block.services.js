const Block = require("../models/block");
const crypto = require("crypto");

const { getPrivateKey, createSign, compareSign } = require("./key.services");
const { getPrincipal, getPrincipalByID } = require("./principal.services");
const { getTeacherByID } = require("./teacher.services");
const { editGadingByID } = require("./gading.services");
const Principal = require("../models/principal");
const Teacher = require("../models/teacher");
const { editStudentByID, editVerifyStudent } = require("./student.services");

const isStart = async () => {
  const listBlocks = await Block.find();
  if (listBlocks.length === 0) {
    return true;
  }
  return false;
};

const getPrincipalPrivateKey = async () => {
  const principal = await getPrincipal();
  const privateKey = await getPrivateKey(principal.username, "principal");
  return privateKey;
};

const getLastBlock = async () => {
  const lastBlock = await Block.findOne({ isVerify: true }).sort({
    createdAt: -1,
  });
  return lastBlock;
};

const getPrevHashBlock = async () => {
  const lastBlock = await getLastBlock();
  const plainText = JSON.stringify({
    lastBlockData: lastBlock.data,
    lastHashBlockPrev: lastBlock.hashPrevBlock,
  });
  const hash = crypto.createHash("sha256").update(plainText).digest("hex");
  return hash;
};

const getNextNumer = async () => {
  const listBlocks = await Block.find({ isVerify: true });
  console.log("🚀 ~ listBlocks:", listBlocks);
  const lastBlock = await getLastBlock();
  console.log("🚀 ~ lastBlock:", lastBlock);
  if (listBlocks.length == lastBlock.number) {
    return listBlocks.length + 1;
  } else {
    return "ERROR NUMBER";
  }
};

const createBlock = async (data) => {
  await Block.create(data);
};

const checkConditionCreateBlock = async (studentID) => {
  const block = await Block.find({ "data.studentID": studentID });
  if (block.length === 0) {
    return true;
  }
  return false;
};

module.exports = {
  getListBlocks: async () => {
    const listBlocks = await Block.find({ isVerify: true }).sort({
      number: 1,
    });
    return listBlocks;
  },
  getListBlocksTemp: async () => {
    const listBlocks = await Block.find({ isVerify: false });
    return listBlocks;
  },
  getBlockByID: async (blockID) => {
    return await Block.findById(blockID);
  },
  getNumberOfUser: async () => {
    try {
      const principal = await Principal.find();
      const teacher = await Teacher.find();
      return {
        message: "OK",
        data: principal.length + teacher.length,
      };
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return {
        message: "ERROR",
        data: null,
      };
    }
  },
  createBlockTemp: async (data, teacherID) => {
    try {
      const teacher = await getTeacherByID(teacherID);
      if (!teacher) {
        return "Teacher not found";
      }
      const publickey = teacher.publicKey;
      const teacherPrivateKey = await getPrivateKey(
        teacher.username,
        "teachers"
      );
      if (teacherPrivateKey.includes("ERROR")) {
        return "Can not get teacher private key";
      }
      const principalPrivateKey = await getPrincipalPrivateKey();
      if (principalPrivateKey.includes("ERROR")) {
        return "Can not get principal private key";
      }

      if (await isStart()) {
        data.number = 1;
        data.data = "tuanna";
        const teacherSign = await createSign(teacherPrivateKey, data.data);
        if (!teacherSign) {
          return "Can not create teacher sign";
        }
        const principalSign = await createSign(principalPrivateKey, data.data);
        if (!principalSign) {
          return "Can not create principal sign";
        }
        if (teacherSign && principalSign) {
          data.isVerify = true;
        }
        data.signature = {
          teacher: teacherSign,
          principal: principalSign,
        };
        data.hashPrevBlock = "";
        await createBlock(data);
      } else {
        if (await checkConditionCreateBlock(data.data.studentID)) {
          const teacherSign = await createSign(teacherPrivateKey, data.data);
          if (!teacherSign) {
            return "Can not create teacher sign";
          }
          if (!data.data.average) {
            return "No data to sign";
          }
          data.signature = {
            teacher: teacherSign,
          };
          data.isVerify = false;
          data.teacherPublicKey = publickey;
          data.teacherUsername = teacher.username;
          await createBlock(data);
          await editGadingByID(data.data._id, { isSign: true });
          await editVerifyStudent(data.data.studentID, true);
        } else {
          return "Student already exist";
        }
      }
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },

  updateBlockTempToBlock: async (blockID, principalID) => {
    try {
      const block = await Block.findById(blockID);
      if (!block) {
        return "Block not found";
      }
      const isVerified = await compareSign(
        block.data,
        block.teacherPublicKey,
        block.signature.teacher
      );
      if (!isVerified) {
        return "Signature is false or data is changed";
      }
      const number = await getNextNumer();
      if (number === "ERROR NUMBER") {
        return number;
      }
      const principal = await getPrincipalByID(principalID);
      const principalPrivateKey = await getPrivateKey(
        principal.username,
        "principal"
      );
      const principalSign = await createSign(principalPrivateKey, block.data);
      await Block.findByIdAndUpdate(blockID, {
        isVerify: true,
        number,
        hashPrevBlock: await getPrevHashBlock(),
        "signature.principal": principalSign,
      });
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },

  deleteBlockTempByID: async (blockID) => {
    try {
      const block = await Block.findById(blockID);
      if (!block) {
        return "Block temp not found";
      }
      await editGadingByID(block.data._id, { isSign: false });
      await editVerifyStudent(block.data.studentID, false);
      await Block.findByIdAndRemove(blockID);
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },
};

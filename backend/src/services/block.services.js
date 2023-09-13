const Block = require("../models/block");
const crypto = require("crypto");

const { getPrivateKey, createSign } = require("./key.services");
const { getPrincipal } = require("./principal.services");
const { getTeacherByID } = require("./teacher.services");
const { editGadingByID } = require("./gading.services");

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
  const lastBlock = await Block.findOne().sort({ createdAt: -1 });
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
  const listBlocks = await Block.find();
  const lastBlock = await getLastBlock();
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
  getListBlocksTemp: async () => {
    const listBlocks = await Block.find({ isVerify: false });
    return listBlocks;
  },
  createBlockTemp: async (data, teacherID) => {
    console.log("🚀 ~ data:", data);
    try {
      const teacher = await getTeacherByID(teacherID);
      if (!teacher) {
        return "TEACHER NOT FOUND";
      }

      const teacherPrivateKey = await getPrivateKey(
        teacher.username,
        "teachers"
      );
      if (teacherPrivateKey.includes("ERROR")) {
        return "CAN NOT GET TEACHER PRIVATE KEY";
      }

      const principalPrivateKey = await getPrincipalPrivateKey();
      if (principalPrivateKey.includes("ERROR")) {
        return "CAN NOT GET PRINCIPAL PRIVATE KEY";
      }

      // khi chưa có block nào
      if (await isStart()) {
        data.number = 1;
        data.data = "tuanna";

        const teacherSign = await createSign(teacherPrivateKey, data.data);
        if (!teacherSign) {
          return "CAN NOT CREATE TEACHER SIGN";
        }

        const principalSign = await createSign(principalPrivateKey, data.data);
        if (!principalSign) {
          return "CAN NOT PRINCIPAL TEACHER SIGN";
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
            return "CAN NOT CREATE TEACHER SIGN";
          }
          // data.number = await getNextNumer();
          data.signature = {
            teacher: teacherSign,
          };
          data.hashPrevBlock = await getPrevHashBlock();
          data.isVerify = false;
          await createBlock(data);
          await editGadingByID(data.data._id, { isSign: true });
        } else {
          return "STUDENT ALREADY EXIST";
        }
      }
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
        return "BLOCK TEMP NOT FOUND";
      }
      await Block.findByIdAndRemove(blockID);
      return "OK";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return "ERROR";
    }
  },
};

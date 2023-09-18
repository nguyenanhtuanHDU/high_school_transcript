import { IGading } from './gading.interface';

export interface IBlockTemp {
  _id: string;
  signature: {
    teacher: string;
  };
  teacherPublicKey: string;
  data: IGading | any;
  hashPrevBlock: String;
  isVerify: boolean;
}

export interface IBlock {
  _id: string;
  number: string;
  signature: {
    teacher: string;
    principal: string;
  };
  data: IGading | any;
  hashPrevBlock: String;
  createdAt: Date;
  updatedAt: Date;
}

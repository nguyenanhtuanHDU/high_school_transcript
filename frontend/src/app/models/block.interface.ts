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

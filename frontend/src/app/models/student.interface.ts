export interface IStudent {
  teacherID: string;
  fullName: string;
  birthday: Date;
}

export interface IStudentGet {
  _id: string
  fullName: string;
  birthday: Date;
  isSign: Boolean
}

export interface IStudentEdit {
  _id: string
  fullName: string;
  birthday: Date;
}

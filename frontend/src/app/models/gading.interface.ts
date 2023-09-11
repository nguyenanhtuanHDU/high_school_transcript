export interface IGading {
  _id: string;
  studentID: string;
  studentName: string;
  math?: number;
  literature?: number;
  english?: number;
  average?: number;
  images?: string[];
}

export interface IGadingEdit {
  _id: string;
  // studentID: string;
  // studentName: string;
  math?: number;
  literature?: number;
  english?: number;
  images?: string[];
}

export interface IGadingEditImages extends IGadingEdit {
  imagesDelete?: string[];
  type?: string;
}

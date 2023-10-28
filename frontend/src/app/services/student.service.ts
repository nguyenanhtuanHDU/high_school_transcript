import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IStudent, IStudentEdit } from '../models/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private api: string = environment.apiBackEnd + 'student/';
  private api2: string = environment.apiBackEnd + 'students/';
  private apiList: string = 'http://localhost:8000/v1/api/students?teacherID=';
  constructor(private http: HttpClient) {}

  getAllStudents() {
    return this.http.get(this.api2 + 'all', { withCredentials: true });
  }

  getListStudentsByTeacherID(teacherID: string) {
    return this.http.get(this.apiList + teacherID);
  }

  getNumberOfStudent() {
    return this.http.get(this.api2 + 'count');
  }

  createStudent(data: IStudent) {
    return this.http.post(this.api, data);
  }

  editStudentByID(student: IStudentEdit) {
    const { _id, fullName, birthday } = student;
    return this.http.put(this.api + _id, { fullName, birthday });
  }

  deleteStudentByID(studentID: string) {
    return this.http.delete(this.api + studentID);
  }
}

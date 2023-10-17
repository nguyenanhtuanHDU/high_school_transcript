import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Teacher } from '../models/teacher.interface';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  private apiTeacher: string = environment.apiBackEnd + 'teacher/';

  createTeacher(teacher: Teacher) {
    return this.http.post(this.apiTeacher, teacher);
  }

  deleteTeacher(teacherID: string) {
    return this.http.delete(this.apiTeacher + teacherID, {
      withCredentials: true,
    });
  }
}

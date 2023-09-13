import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Teacher } from '../models/teacher.interface';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  private api: string = environment.apiBackEnd;

  createTeacher(teacher: Teacher) {
    return this.http.post(this.api + 'teacher', teacher);
  }
}

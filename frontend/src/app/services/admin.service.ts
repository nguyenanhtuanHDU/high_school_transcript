import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private api: string = environment.apiBackEnd + 'admin/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllUser() {
    return this.http.get(this.api + 'users');
  }

  editRoleSign(isSign: boolean, userID: string) {
    return this.http.post(
      this.api + 'users/role-sign',
      { isSign, userID },
      { withCredentials: true }
    );
  }
}

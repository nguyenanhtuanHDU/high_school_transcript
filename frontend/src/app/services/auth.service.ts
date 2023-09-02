import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ISignIn } from '../models/sign-in.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}
  apiAuth: string = 'http://localhost:8000/auth/sign-in';

  setToken(token: string) {
    this.cookieService.set('token', token);
  }

  removeToken() {
    this.cookieService.delete('token');
  }

  signIn(data: ISignIn) {
    console.log("🚀 ~ data:", data)
    return this.http.post(this.apiAuth, data);
  }
}

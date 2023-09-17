import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ISignIn } from '../models/sign-in.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}
  private apiAuth: string = environment.apiRoot + 'auth/sign-in';

  setToken(tokenName: string, token: string) {
    this.cookieService.set(tokenName, token);
  }

  getToken(tokenName: string): string {
    return this.cookieService.get(tokenName);
  }

  removeToken(tokenName: string) {
    this.cookieService.delete(tokenName);
  }

  logOut() {
    this.cookieService.deleteAll();
  }

  signIn(data: ISignIn) {
    return this.http.post(this.apiAuth, data);
  }
}

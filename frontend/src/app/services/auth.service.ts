import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  setToken(token: string) {
    this.cookieService.set('token', token);
  }

  removeToken() {
    this.cookieService.delete('token');
  }
}

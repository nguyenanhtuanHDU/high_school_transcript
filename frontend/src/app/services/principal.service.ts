import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Principal } from '../models/principal.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PrincipalService {
  constructor(private http: HttpClient) {}
  api: string = environment.apiBackEnd + 'principal/';

  createPrincipal(principal: Principal) {
    return this.http.post(this.api, principal);
  }
}

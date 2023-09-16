import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Principal } from '../models/principal.interface';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrincipalService {
  constructor(private http: HttpClient) {}
  private api: string = environment.apiBackEnd + 'principal/';

  createPrincipal(principal: Principal) {
    return this.http.post(this.api, principal);
  }
}

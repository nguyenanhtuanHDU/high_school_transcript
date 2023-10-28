import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Principal } from '../models/principal.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PrincipalService {
  constructor(private http: HttpClient) {}
  private api: string = environment.apiBackEnd + 'principal/';

  createPrincipal(principal: Principal) {
    return this.http.post(this.api, principal);
  }

  toggleActivePrincipal(principalID: string) {
    return this.http.post(
      this.api + 'active/' + principalID,
      {},
      { withCredentials: true }
    );
  }

  deletePrincipal(principalID: string) {
    return this.http.delete(this.api + principalID, {
      withCredentials: true,
    });
  }
}

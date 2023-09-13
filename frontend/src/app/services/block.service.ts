import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IGading } from '../models/gading.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  private apiTemp: string = environment.apiBackEnd + 'block/temp/';
  private api: string = environment.apiBackEnd + 'block/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getListBlocksTemp() {
    return this.http.get(this.api + 'temp/list');
  }

  createBlockTemp(data: IGading) {
    const teacherID = this.authService.getToken('userSessionID');
    return this.http.post(this.apiTemp + '?teacherID=' + teacherID, data);
  }

  createBlock(blockID: string) {
    const teacherID = this.authService.getToken('userSessionID');
    return this.http.put(this.api + blockID, { isVerify: true });
  }

  deleteBlockTempByID(blockID: string) {
    return this.http.delete(this.api + 'temp/' + blockID);
  }
}

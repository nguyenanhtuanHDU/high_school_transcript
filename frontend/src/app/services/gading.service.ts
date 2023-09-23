import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { IGadingEdit, IGadingEditImages } from '../models/gading.interface';

@Injectable({
  providedIn: 'root',
})
export class GadingService {
  private api: string = environment.apiBackEnd + 'gading/';
  constructor(private authService: AuthService, private http: HttpClient) {}

  getSingleGadingsByStudentID(studentID: string) {
    return this.http.get(this.api + studentID);
  }

  getListGadingsByTeacherID() {
    const teacherID = this.authService.getToken('userSessionID');
    return this.http.get(this.api + 'gadings/?teacherID=' + teacherID);
  }

  addPoint(data: IGadingEdit, images: FileList) {
    const formData: FormData = new FormData();
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }
    formData.append('data', JSON.stringify(data));
    return this.http.put(this.api, formData);
  }

  changeImages(
    data: IGadingEditImages,
    images: FileList,
    imagesDelete: string[]
  ) {
    console.log('🚀 ~ imagesDelete:', imagesDelete);
    const formData: FormData = new FormData();
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }
    formData.append('imagesDelete', JSON.stringify(imagesDelete));
    data.type = 'CHANGE_IMAGES';
    formData.append('data', JSON.stringify(data));
    return this.http.put(this.api, formData);
  }

  deleteGadingByID(gadingID: string) {
    return this.http.delete(this.api + gadingID);
  }
}

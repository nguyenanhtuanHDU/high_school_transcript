import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Đăng kí');
  }

  signUpForm = new FormGroup({
    username: new FormControl(''),
    job: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
  });
  username: string = '';
  jobOptions: any[] = [
    { label: 'Hiệu trưởng', value: 'Hiệu trưởng' },
    { label: 'Giáo viên chủ nhiệm', value: 'Giáo viên chủ nhiệm' },
  ];

  signUp() {
    console.log(this.signUpForm.value);
  }
}

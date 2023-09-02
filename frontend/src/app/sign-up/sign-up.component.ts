import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/teacher.interface';
import { Subject, takeUntil, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [MessageService],
})
export class SignUpComponent {
  constructor(
    private titleService: Title,
    private messageService: MessageService,
    private teacherService: TeacherService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) {
    this.titleService.setTitle('Đăng kí');
  }

  signUpForm = new FormGroup({
    username: new FormControl(''),
    fullName: new FormControl(''),
    job: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
  });
  username: string = '';
  jobOptions: any[] = [
    { label: 'Principal', value: 'Principal' },
    { label: 'Teacher', value: 'Teacher' },
  ];
  listFormFields: string[] = [
    'username',
    'fullName',
    'job',
    'password',
    'repeatPassword',
  ];
  teacherData!: Teacher;
  destroy = new Subject();

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

  checkSingleField(fieldName: string): boolean {
    if (!this.signUpForm.get(fieldName)?.value) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Missing ' + fieldName,
      });
      console.log('rong');
      return false;
    }
    return true;
  }

  validatePassword(): boolean {
    const password = this.signUpForm.get('password')?.value;
    const repeatPassword = this.signUpForm.get('repeatPassword')?.value;

    if (password && password.length < 6) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Password must be greater than 5 in length',
      });
      return false;
    }
    if (password !== repeatPassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Password not the same',
      });
      return false;
    }
    return true;
  }

  checkFormFields(): boolean {
    for (const field of this.listFormFields) {
      if (!this.checkSingleField(field)) {
        return false;
      }
    }
    if (!this.validatePassword()) {
      return false;
    }
    return true;
  }

  createTeacher(teacher: Teacher) {
    this.spinner.show();
    this.teacherService
      .createTeacher(teacher)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Create accout successfully',
          });
        },
        (error) => {
          this.spinner.hide();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        }
      );
  }

  setTeacherData() {
    this.teacherData = {
      username: this.signUpForm.get('username')?.value!,
      password: this.signUpForm.get('password')?.value!,
      fullName: this.signUpForm.get('fullName')?.value!,
    };
  }

  signUp() {
    if (this.checkFormFields()) {
      console.log('run');
      if (this.signUpForm.get('job')?.value === 'Teacher') {
        console.log('run teacher');
        this.setTeacherData();
        this.createTeacher(this.teacherData);
        // this.route.navigate(['sign-in']);
      } else if (this.signUpForm.get('job')?.value === 'Principal') {
        // loading...
      }
    } else {
      console.log('not run');

      return;
    }
  }
}

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
import { Principal } from '../models/principal.interface';
import { PrincipalService } from '../services/principal.service';

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
    private principalService: PrincipalService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) {
    this.titleService.setTitle('School - Sign Up');
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
  principalData!: Principal;
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
        () => {
          this.spinner.hide();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Create accout successfully',
          });
          this.route.navigate(['sign-in']);
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

  createPrincipal(principal: Principal) {
    this.spinner.show();
    this.principalService
      .createPrincipal(principal)
      // .pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => {
          console.log('🚀 ~ data:', data);
          this.spinner.hide();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Create accout successfully',
          });
          this.route.navigate(['sign-in']);
        },
        (error) => {
          console.log('🚀 ~ error:', error);
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

  setPrincipalData() {
    this.principalData = {
      username: this.signUpForm.get('username')?.value!,
      password: this.signUpForm.get('password')?.value!,
      fullName: this.signUpForm.get('fullName')?.value!,
    };
  }

  signUp() {
    if (this.checkFormFields()) {
      if (this.signUpForm.get('job')?.value === 'Teacher') {
        this.setTeacherData();
        this.createTeacher(this.teacherData);
      } else if (this.signUpForm.get('job')?.value === 'Principal') {
        this.setPrincipalData();
        this.createPrincipal(this.principalData);
      }
    } else {
      return;
    }
  }
}

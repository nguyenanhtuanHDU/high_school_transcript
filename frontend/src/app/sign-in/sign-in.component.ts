import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { ISignIn } from '../models/sign-in.interface';
import { Subject, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [MessageService],
})
export class SignInComponent {
  constructor(
    private titleService: Title,
    private authService: AuthService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) {
    this.titleService.setTitle('Sign In');
  }
  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  destroy = new Subject();
  dataSignIn!: ISignIn;

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

  setDataSignIn(username: string, password: string) {
    this.dataSignIn = {
      username,
      password,
    };
    console.log('🚀 ~ this.dataSignI:', this.dataSignIn);
  }

  validateSignIn(): boolean {
    const username = this.signInForm.get('username')?.value;
    const password = this.signInForm.get('password')?.value;
    if (!username) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Missing username',
      });
      return false;
    }

    if (!password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Missing password',
      });
      return false;
    }

    if (password.length < 6) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Password must be greater than 5 in length',
      });
      return false;
    }
    this.setDataSignIn(username, password);
    return true;
  }

  signIn() {
    if (this.validateSignIn()) {
      console.log(this.signInForm.value);
      this.spinner.show();
      this.authService
        .signIn(this.dataSignIn)
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
  }
}

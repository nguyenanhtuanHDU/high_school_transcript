import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Sign In');
  }
  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  signIn() {
    console.log(this.signInForm.value);
  }
}

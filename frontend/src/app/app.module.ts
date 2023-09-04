import {
  APP_INITIALIZER,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PasswordModule } from 'primeng/password';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
  primeConfig.ripple = true;
};

@NgModule({
  declarations: [AppComponent, SignUpComponent, SignInComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    SelectButtonModule,
    PasswordModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    HttpClientModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    ConfirmDialogModule,
  ],
  providers: [
    CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [PrimeNGConfig],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

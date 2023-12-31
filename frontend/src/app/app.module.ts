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
import { StudentComponent } from './student/student.component';
import { HeaderComponent } from './header/header.component';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { GadingComponent } from './gading/gading.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { BlockTempComponent } from './block-temp/block-temp.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BlockComponent } from './block/block.component';
import { TimeAgoPipe } from './share/pipe/time-ago.pipe';
import { ChartModule } from 'primeng/chart';
import { NgChartsModule } from 'ng2-charts';
import { SkeletonModule } from 'primeng/skeleton';
import { ClipboardModule } from 'ngx-clipboard';
import { UsersComponent } from './users/users.component';
import { HiddenStringPipe } from './share/pipe/hidden-string.pipe';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GuestComponent } from './guest/guest.component';

const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} };

const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
  primeConfig.ripple = true;
};

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    StudentComponent,
    HeaderComponent,
    GadingComponent,
    BlockTempComponent,
    PageNotFoundComponent,
    BlockComponent,
    TimeAgoPipe,
    UsersComponent,
    HiddenStringPipe,
    GuestComponent,
  ],
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
    DialogModule,
    CalendarModule,
    InputNumberModule,
    FileUploadModule,
    ImageModule,
    OverlayPanelModule,
    ChartModule,
    NgChartsModule,
    SkeletonModule,
    ClipboardModule,
    TabViewModule,
    InputSwitchModule,
    SocketIoModule.forRoot(config)
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

import { Component } from '@angular/core';
import {
  faHome,
  faRightFromBracket,
  faListCheck,
  faBookMedical,
  faHourglassHalf,
  faCube,
} from '@fortawesome/free-solid-svg-icons';
import {
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  faRightFromBracket = faRightFromBracket;
  faHome = faHome;
  faListCheck = faListCheck;
  faBookMedical = faBookMedical;
  faHourglassHalf = faHourglassHalf;
  faCube = faCube;
  usernameSession: string = '';
  typeSession: string = '';

  ngOnInit() {
    this.usernameSession = this.authService.getToken('userSessionUsername');
    this.typeSession = this.authService.getToken('type');
  }
  logOut() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to logout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.removeToken('userSessionID');
        this.router.navigate(['sign-in']);
      },
      reject: () => {},
    });
  }
}

import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  faHome,
  faRightFromBracket,
  faListCheck,
  faBookMedical,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
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
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
        this.authService.removeToken('userSessionID');
        this.router.navigate(['sign-in']);
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
}

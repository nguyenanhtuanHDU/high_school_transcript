import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  faRightFromBracket,
  faHome,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class HomeComponent {
  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.titleService.setTitle('Home');
  }

  faRightFromBracket = faRightFromBracket;
  faHome = faHome;
  faPlus = faPlus;
  usernameSession: string = '';

  ngOnInit() {
    this.usernameSession = this.authService.getToken('usernameSession');
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
        this.authService.removeToken('usernameSession');
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

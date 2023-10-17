import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BlockService } from '../services/block.service';
import { GadingService } from '../services/gading.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth.service';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Principal } from '../models/principal.interface';
import { Teacher } from '../models/teacher.interface';
import { Subject, take, takeUntil } from 'rxjs';
import {
  faArrowsRotate,
  faCircleCheck,
  faEye,
  faFileSignature,
  faMagnifyingGlass,
  faTrash,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import { TeacherService } from '../services/teacher.service';
import { PrincipalService } from '../services/principal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../block-temp/block-temp.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class UsersComponent {
  constructor(
    private adminService: AdminService,
    private gadingService: GadingService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private teacherService: TeacherService,
    private principalService: PrincipalService,
    private titleService: Title
  ) {
    this.titleService.setTitle('School - Users');
  }
  ngOnInit() {
    this.getAllUser();
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

  faTrash = faTrash;
  faEye = faEye;
  faFileSignature = faFileSignature;
  faArrowsRotate = faArrowsRotate;
  faMagnifyingGlass = faMagnifyingGlass;
  faUserGear = faUserGear;
  faCircleCheck = faCircleCheck;

  destroy = new Subject();
  listPrincipals!: Principal[];
  listTeachers!: Teacher[];

  getAllUser() {
    this.spinner.show();
    this.adminService
      .getAllUser()
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          this.listPrincipals = data.data.principals;
          this.listTeachers = data.data.teachers;
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

  editRoleSign(isSign: boolean, userID: string) {
    this.spinner.show();
    this.adminService
      .editRoleSign(isSign, userID)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data) => {
          this.spinner.hide();
          console.log('🚀 ~ data:', data);
          this.getAllUser();
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

  deleteTeacher(teacherID: string, teacherUsername: string) {
    this.confirmationService.confirm({
      message:
        'Do you want to sign to student with username is: ' +
        teacherUsername +
        ' ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.spinner.show();
        this.teacherService
          .deleteTeacher(teacherID)
          .pipe(takeUntil(this.destroy))
          .subscribe(
            (data: any) => {
              this.getAllUser();
              this.spinner.hide();
              console.log('🚀 ~ data:', data);
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
      },
      reject: () => {},
    });
  }

  deletePrincipal(principalID: string, principalUsername: string) {
    this.confirmationService.confirm({
      message:
        'Do you want to sign to student with full name is: ' +
        principalUsername +
        ' ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.spinner.show();
        this.principalService
          .deletePrincipal(principalID)
          .pipe(takeUntil(this.destroy))
          .subscribe(
            (data: any) => {
              this.getAllUser();
              this.spinner.hide();
              console.log('🚀 ~ data:', data);
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
      },
      reject: () => {},
    });
  }
}

import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { IBlockTemp } from '../models/block.interface';
import { environment } from 'src/environments/environment.development';
import { BlockService } from '../services/block.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  faTrash,
  faEye,
  faFileSignature,
  faArrowsRotate,
  faMagnifyingGlass,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { IGading } from '../models/gading.interface';
import { GadingService } from '../services/gading.service';

@Component({
  selector: 'app-block-temp',
  templateUrl: './block-temp.component.html',
  styleUrls: ['./block-temp.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class BlockTempComponent {
  constructor(
    private blockService: BlockService,
    private gadingService: GadingService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private titleService: Title
  ) {
    this.titleService.setTitle('School - Block Temp');
  }
  ngOnInit() {
    this.getListBlocksTemp();
    this.typeSession = this.authService.getToken('type');
    this.userSessionUsername = this.authService.getToken('userSessionUsername');
  }
  ngOndestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

  faTrash = faTrash;
  faEye = faEye;
  faFileSignature = faFileSignature;
  faArrowsRotate = faArrowsRotate;
  faMagnifyingGlass = faMagnifyingGlass;
  faCircleCheck = faCircleCheck;

  destroy = new Subject();
  apiImage: string = environment.apiImage;
  typeSession: string = '';
  listBlocksTemp: IBlockTemp[] = [];
  isShowImage: boolean = false;
  isCheckStudent: boolean = false;
  imgSrc: string = '';
  gadingCheck!: IGading;
  gadingCurrent!: IGading;
  headerCheckGading: string = '';
  userSessionUsername: string = '';

  getListBlocksTemp() {
    this.spinner.show();
    this.blockService
      .getListBlocksTemp()
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          this.listBlocksTemp = data.data;
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

  deleteBlockTemp(blockID: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.spinner.show();
        this.blockService
          .deleteBlockTempByID(blockID)
          .pipe(takeUntil(this.destroy))
          .subscribe(
            () => {
              this.spinner.hide();
              this.getListBlocksTemp();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Delete block successfully',
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
      },
      reject: () => {},
    });
  }

  createBlock(blockID: string) {
    this.confirmationService.confirm({
      message: 'Do you want to sign ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.spinner.show();
        this.blockService
          .createBlock(blockID)
          .pipe(takeUntil(this.destroy))
          .subscribe(
            () => {
              this.spinner.hide();
              this.getListBlocksTemp();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Sign to block successfully',
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
      },
      reject: () => {},
    });
  }

  displayDialogImage(isShow: boolean, imgSrc: string) {
    this.isShowImage = isShow;
    this.imgSrc = imgSrc;
  }

  getGading(studentID: string) {
    this.gadingService
      .getSingleGadingsByStudentID(studentID)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => {
          this.gadingCheck = data.data;
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

  displayDialogCheckStudent(isShow: boolean, studentID: string) {
    this.getGading(studentID);
    this.headerCheckGading = 'Find gading by studentID: ' + studentID;
    this.isCheckStudent = isShow;
  }

  getGadingCurrtent(gading: IGading) {
    this.gadingCurrent = gading;
  }

  checkGading(): boolean {
    if (
      this.gadingCheck.studentName === this.gadingCurrent.studentName &&
      this.gadingCheck.studentID === this.gadingCurrent.studentID &&
      this.gadingCheck.math === this.gadingCurrent.math &&
      this.gadingCheck.literature === this.gadingCurrent.literature &&
      this.gadingCheck.english === this.gadingCurrent.english &&
      this.gadingCheck.average === this.gadingCurrent.average
    ) {
      return true;
    }
    return false;
  }
}

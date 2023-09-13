import { Component } from '@angular/core';
import {
  faArrowsRotate,
  faPlus,
  faPenToSquare,
  faTrash,
  faXmark,
  faCheck,
  faFileSignature,
} from '@fortawesome/free-solid-svg-icons';
import { IGading, IGadingEdit } from '../models/gading.interface';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { GadingService } from '../services/gading.service';
import { Subject, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.development';
import { BlockService } from '../services/block.service';

@Component({
  selector: 'app-gading',
  templateUrl: './gading.component.html',
  styleUrls: ['./gading.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class GadingComponent {
  constructor(
    private gadingService: GadingService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private blockService: BlockService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getListGadings();
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

  faArrowsRotate = faArrowsRotate;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faXmark = faXmark;
  faCheck = faCheck;
  faFileSignature = faFileSignature;

  listGadings: IGading[] = [];
  gadingSession: IGadingEdit = {
    _id: '',
    math: 0,
    literature: 0,
    english: 0,
  };
  headingForm: string = 'Edit gading for ';
  isShowAddGading: boolean = false;
  destroy = new Subject();
  imagesDisplay: string[] = [];
  imagesDelete: string[] = [];
  newImagesSelected: string[] = [];
  selectedFiles!: FileList | null;
  apiImage: string = environment.apiImage;

  handleFileInput(event: any) {
    this.newImagesSelected = [];
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagesDisplay.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  removeImagesDisplay(index: number) {
    this.imagesDisplay.splice(index, 1);
  }

  addImagesDelete(imageName: string) {
    this.imagesDelete.push(imageName);
  }

  getListGadings() {
    this.spinner.show();
    this.gadingService
      .getListGadingsByTeacherID()
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          this.listGadings = data.data;
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

  resetForm() {
    this.headingForm = 'Edit gading for ';
    this.isShowAddGading = false;
    this.imagesDisplay = [];
    this.imagesDelete = [];
    this.newImagesSelected = [];
    this.selectedFiles = null;
  }

  changeImages() {
    this.gadingService
      .changeImages(this.gadingSession, this.selectedFiles!, this.imagesDelete)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.resetForm();
          this.getListGadings();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Edit gading successfully',
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

  addPoint() {
    if (this.imagesDelete.length > 0) {
      this.changeImages();
    } else {
      // if (this.selectedFiles) {
      this.gadingService
        .addPoint(this.gadingSession, this.selectedFiles!)
        .pipe(takeUntil(this.destroy))
        .subscribe(
          () => {
            this.spinner.hide();
            this.resetForm();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Edit gading successfully',
            });
            this.resetForm();
            this.getListGadings();
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
      // }
    }
  }

  validatePoint(): boolean {
    const math = this.gadingSession.math;
    const english = this.gadingSession.english;
    const literature = this.gadingSession.literature;
    if (!math) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Missing math',
      });
      return false;
    }
    if (math < 0 || math > 10) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Invalid math',
      });
      return false;
    }
    if (!english) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Missing english',
      });
      return false;
    }
    if (english < 0 || english > 10) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Invalid english',
      });
      return false;
    }
    if (!literature) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Missing literature',
      });
      return false;
    }
    if (literature < 0 || literature > 10) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Invalid literature',
      });
      return false;
    }
    return true;
  }

  validateForm(): boolean {
    if (!this.validatePoint()) {
      return false;
    }
    return true;
  }

  submitFormGading() {
    if (!this.validateForm()) {
      return;
    }
    this.addPoint();
  }

  hideFormEditGading() {
    this.isShowAddGading = false;
  }

  showFormEditGading(gading: IGading) {
    this.headingForm += ' : ' + gading.studentName;
    this.gadingSession._id = gading._id;
    this.gadingSession = gading;
    this.isShowAddGading = true;
  }

  createBlockTemp(gading: IGading) {
    this.confirmationService.confirm({
      message: 'Do you want to sign ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.spinner.show();
        this.blockService
          .createBlockTemp(gading)
          .pipe(takeUntil(this.destroy))
          .subscribe(
            () => {
              this.spinner.hide();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Sign successfully',
              });
              this.getListGadings();
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

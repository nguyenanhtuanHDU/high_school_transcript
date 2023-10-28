import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  faPenToSquare,
  faTrash,
  faPlus,
  faCheck,
  faXmark,
  faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { StudentService } from '../services/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IStudent, IStudentGet } from '../models/student.interface';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class StudentComponent {
  constructor(
    private titleService: Title,
    private messageService: MessageService,
    private studentService: StudentService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private confirmationService: ConfirmationService
  ) {
    this.titleService.setTitle('School - Students');
  }

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faPlus = faPlus;
  faCheck = faCheck;
  faXmark = faXmark;
  faArrowsRotate = faArrowsRotate;

  isShowAddStudent: boolean = false;
  studentID: string = '';
  studentName: string = '';
  studentDate!: Date | null;
  destroy = new Subject();
  teacherIDSession: string = '';
  student!: IStudent;
  studentEdit!: IStudentGet;
  students!: IStudentGet[];
  headingForm: string = '';
  userType: string = '';

  ngOnInit() {
    this.teacherIDSession = this.authService.getToken('userSessionID');
    this.userType = this.authService.getToken('type');
    this.getListStudent();
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
  showFormAddStudent() {
    this.headingForm = 'Add student';
    this.isShowAddStudent = true;
  }

  showFormEditStudent(student: IStudentGet) {
    this.headingForm = 'Edit student';
    this.studentID = student._id;
    this.studentName = student.fullName;
    this.studentDate = new Date(student.birthday);
    this.isShowAddStudent = true;
  }

  hideFormAddStudent() {
    this.isShowAddStudent = false;
  }

  validateFormAddStudent(): boolean {
    if (!this.studentName) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Missing full name',
      });
      return false;
    }
    if (!this.studentDate) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Missing birthday',
      });
      return false;
    }
    return true;
  }

  resetForm() {
    this.studentName = '';
    this.studentDate = null;
  }

  submitFormStudent() {
    if (this.headingForm === 'Add student') {
      console.log('Add student');
      this.addStudent();
    } else if (this.headingForm === 'Edit student') {
      this.editSutdent();
    }
  }

  getListStudent() {
    this.spinner.show();
    if (this.userType == 'ADMIN') {
      this.studentService
        .getAllStudents()
        .pipe(takeUntil(this.destroy))
        .subscribe((data: any) => {
          this.spinner.hide();
          this.students = data.data;
        });
    } else {
      this.studentService
        .getListStudentsByTeacherID(this.teacherIDSession)
        .pipe(takeUntil(this.destroy))
        .subscribe((data: any) => {
          this.spinner.hide();
          this.students = data.data;
        });
    }
  }

  addStudent() {
    if (!this.validateFormAddStudent()) {
      return;
    }
    this.student = {
      teacherID: this.teacherIDSession,
      fullName: this.studentName,
      birthday: this.studentDate!,
    };
    this.spinner.show();
    this.studentService
      .createStudent(this.student)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          this.getListStudent();
          this.hideFormAddStudent();
          this.resetForm();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Create student successfully',
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

  editSutdent() {
    this.spinner.show();
    this.studentDate &&
      this.studentService
        .editStudentByID({
          _id: this.studentID,
          fullName: this.studentName,
          birthday: this.studentDate,
        })
        .pipe(takeUntil(this.destroy))
        .subscribe(
          () => {
            this.spinner.hide();
            this.getListStudent();
            this.hideFormAddStudent();
            this.resetForm();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Update student successfully',
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

  deleteStudent(studentID: string, studentName: string) {
    this.confirmationService.confirm({
      message:
        'Do you want to delete student with full name is: ' +
        studentName +
        ' ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.spinner.show();
        this.studentService
          .deleteStudentByID(studentID)
          .pipe(takeUntil(this.destroy))
          .subscribe(
            () => {
              this.spinner.hide();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Delete student successfully',
              });
              this.getListStudent();
            },
            (error) => {
              this.spinner.hide();

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

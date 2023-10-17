import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  faDatabase,
  faCube,
  faUsersViewfinder,
  faUser,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import {
  Observable,
  Subject,
  catchError,
  forkJoin,
  map,
  takeUntil,
} from 'rxjs';
import { BlockService } from '../services/block.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IBlock, IBlockTemp } from '../models/block.interface';
import { ChartConfiguration, ChartType } from 'chart.js';
import { PrincipalService } from '../services/principal.service';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class HomeComponent {
  constructor(
    private titleService: Title,
    private blockService: BlockService,
    private principalService: PrincipalService,
    private messageService: MessageService,
    private authService: AuthService,
    private studentService: StudentService
  ) {
    this.titleService.setTitle('School - Home');
  }

  ngOnInit() {
    this.loadData();
    this.getNumberOfPrincipal();
    this.getNumberOfStudent();
    this.userPK = this.authService.getToken('userPK');
    this.userType = this.authService.getToken('type');
  }

  faCube = faCube;
  faDatabase = faDatabase;
  faUsersViewfinder = faUsersViewfinder;
  faUser = faUser;
  faCopy = faCopy;

  isChart: boolean = false;
  destroy = new Subject();
  data: any;
  options: any;
  listBlock!: IBlock[];
  listBlockTemp!: IBlockTemp[];
  countPrincipals!: number;
  countStudent!: number;
  userPK: string = '';
  visiblePK: boolean = false;
  userType: string = '';

  public doughnutChartLabels: string[] = ['Block', 'Block Temp'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [{ data: [5, 5] }];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  showDialogUserPK() {
    this.visiblePK = true;
  }

  copyPK() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Copy to clipboard successfully',
    });
    this.visiblePK = false;
  }

  getListBlock() {
    this.blockService
      .getListBlocks()
      .pipe(
        takeUntil(this.destroy),
        map((data: any) => (this.listBlock = data.data))
      )
      .subscribe(
        (data: any) => {
          this.listBlock = data;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        }
      );
  }

  getListBlockTemp() {
    this.blockService
      .getListBlocksTemp()
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => {
          this.listBlockTemp = data.data;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        }
      );
  }

  getNumberOfStudent() {
    this.studentService
      .getNumberOfStudent()
      .pipe(takeUntil(this.destroy))
      .subscribe((data: any) => {
        this.countStudent = data.data;
      });
  }

  loadData() {
    forkJoin([
      this.blockService.getListBlocks(),
      this.blockService.getListBlocksTemp(),
    ])
      .pipe(
        takeUntil(this.destroy),
        catchError((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
          return [];
        })
      )
      .subscribe(([blocks, blockTemps]: any) => {
        this.listBlock = blocks.data;
        this.listBlockTemp = blockTemps.data;
        this.createChart();
      });
  }

  createChart() {
    if (this.listBlock && this.listBlockTemp) {
      this.doughnutChartDatasets = [
        { data: [this.listBlock?.length, this.listBlockTemp?.length] },
      ];
    }
  }

  getNumberOfPrincipal() {
    console.log('🚀 ~ getNumberOfPrincipal:');
    this.blockService
      .getNumberOfUser()
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => {
          console.log('🚀 ~ data:', data);
          this.countPrincipals = data.data;
        },
        (error) => {
          console.log('🚀 ~ error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        }
      );
  }
}

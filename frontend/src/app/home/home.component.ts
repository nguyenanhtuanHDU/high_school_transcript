import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  faDatabase,
  faCube,
  faUsersViewfinder,
  faUser,
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
    private messageService: MessageService
  ) {
    this.titleService.setTitle('School - Home');
  }

  ngOnInit() {
    this.loadData();
    this.getNumberOfPrincipal()
  }

  faCube = faCube;
  faDatabase = faDatabase;
  faUsersViewfinder = faUsersViewfinder;
  faUser = faUser;

  isChart: boolean = false;
  destroy = new Subject();
  data: any;
  options: any;
  listBlock!: IBlock[];
  listBlockTemp!: IBlockTemp[];
  countPrincipals!: number;

  public doughnutChartLabels: string[] = ['Block', 'Block Temp'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [{ data: [5, 5] }];
  // public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
  //   [{ data: [this.listBlock?.length, this.listBlockTemp?.length] }];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

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
          console.log("🚀 ~ data:", data)
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

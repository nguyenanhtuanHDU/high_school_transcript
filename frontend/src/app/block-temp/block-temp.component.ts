import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { IBlockTemp } from '../models/block.interface';
import { environment } from 'src/environments/environment.development';
import { BlockService } from '../services/block.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-block-temp',
  templateUrl: './block-temp.component.html',
  styleUrls: ['./block-temp.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class BlockTempComponent {
  constructor(
    private blockService: BlockService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private titleService: Title
  ) {
    this.titleService.setTitle('School - Block Temp');
  }
  ngOnInit() {
    this.getListBlocksTemp();
  }
  ngOndestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

  faTrash = faTrash;
  faEye = faEye;
  destroy = new Subject();
  apiImage: string = environment.apiImage;

  listBlocksTemp: IBlockTemp[] = [];

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
      message: 'Do you want to sign ?',
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
}

import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { IBlock, IBlockTemp } from '../models/block.interface';
import { environment } from 'src/environments/environment.development';
import { BlockService } from '../services/block.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { faArrowsRotate, faEye } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: [
    './block.component.scss',
    '../block-temp/block-temp.component.scss',
  ],
  providers: [ConfirmationService, MessageService],
})
export class BlockComponent {
  constructor(
    private blockService: BlockService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private titleService: Title
  ) {
    this.titleService.setTitle('School - Block');
  }

  ngOnInit() {
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });
    this.socket.on('data', (message: string) => {
      if (['BLOCK_CREATED', 'BLOCK_TEMP_DELETED'].includes(message)) {
        this.getListBlock();
      }
    });
    this.getListBlock();
    this.typeSession = this.authService.getToken('type');
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

  faEye = faEye;
  faArrowsRotate = faArrowsRotate;

  destroy = new Subject();
  listBlocks: IBlock[] = [];
  apiImage: string = environment.apiImage;
  typeSession: string = '';
  isShowImage: boolean = false;
  imgSrc: string = '';
  private socket = io('http://localhost:8000');

  getListBlock() {
    this.spinner.show();
    this.blockService
      .getListBlocks()
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          console.log('🚀 ~ data 2:', data);
          this.listBlocks = data.data;
          this.spinner.hide();
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
  displayDialogImage(isShow: boolean, imgSrc: string) {
    this.isShowImage = isShow;
    this.imgSrc = imgSrc;
  }
}

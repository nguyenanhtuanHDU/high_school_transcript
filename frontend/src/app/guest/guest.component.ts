import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { GadingService } from '../services/gading.service';
import { IGading } from '../models/gading.interface';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent {
  constructor(private gadingService: GadingService) {}

  ngOnInit() {
    // this.searchSubject
    //   .pipe(debounceTime(0), distinctUntilChanged())
    //   .subscribe((searchTerm) => {
    //     console.log(`Searching for: ${searchTerm}`);
    //     this.gadingService
    //       .getListGadingsByStudentName(searchTerm)
    //       .pipe(takeUntil(this.destroy))
    //       .subscribe((data: any) => {
    //         console.log('🚀 ~ data:', data.data);
    //         this.listGadings = data.data;
    //       });
    //   });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

  private searchSubject = new Subject<string>();
  destroy = new Subject();
  studentName: string = '';
  listGadings!: IGading[];
  gading!: IGading;
  faArrowLeft = faArrowLeft;
  visible: boolean = false;
  apiImage: string = environment.apiImage;

  onSearch() {
    // this.searchSubject.next(this.studentName);

    this.gadingService
      .getListGadingsByStudentName(this.studentName)
      .pipe(takeUntil(this.destroy))
      .subscribe((data: any) => {
        console.log('🚀 ~ data:', data.data);
        this.listGadings = data.data;
      });
  }

  setGading(gading: IGading) {
    this.gading = gading;
  }

  showDialog(gading: IGading) {
    this.setGading(gading);
    this.visible = true;
  }
}

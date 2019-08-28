import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input, AfterViewInit,  ElementRef, ViewChild} from '@angular/core';
import * as objectPath from 'object-path';
import { LayoutConfigService } from '../../../../../../core/services/layout-config.service';
import { SubheaderService } from '../../../../../../core/services/layout/subheader.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { Comparator, State, Filter } from '@clr/angular';
import { Subscription } from 'rxjs';
import { UploadDataService } from '../services/upload.services';
import { NotificationService } from '../../../../services/notification.service';
import { NotificationType } from '../../../../../../enums/notification-type';
// import { UploadModel } from '../upload-files-img/upload';
import { ModalService } from '../../../../../public/content/pages/components/notifications/services/modal.service';
import { AuthenticationService } from '../../../../../../core/auth/authentication.service';
// import { StatusCommands } from '../../../../constants/status-commands';
// import { EnumDataService } from '../../../../services/enum.data.service';
// import { EnumNames } from '../../../../constants/enum-names';
// import { TransformBirthDateToAgePipe } from './transform-birthdate-to-age.pipe';
// import { GridRequest } from '../../../../services/grid-request';


@Component({
  selector: 'm-app-upload-images-list',
  templateUrl: './upload-images-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./upload-images-list.component.scss']
})

export class UploadImagesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('clickTable') clickTable: ElementRef;

  public loading = true;
  public deletedId = '';
  public images = [];
  public imageName = '';
  public name = '';
  private subscription: Subscription = new Subscription();
   private currentState: any;
  public statuses: any[] = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private uploadDataService: UploadDataService,
    private activeRoute: ActivatedRoute,
    private modalService: ModalService,
    private notificationService: NotificationService,
  ) {
  }
  ngOnInit() {
    this.subscription = this.activeRoute.params.subscribe(
      params => {
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.clickTable.nativeElement.click();
      }, 900);
  }

  public refresh(state: any) {
     this.currentState = state;
    this.loading = true;
    this.uploadDataService.getImages().subscribe(
      data => {
        this.images = data.result;
        this.loading = false;
      },
      error => {
        this.loading = false;
      });
  }

  public createImagesPath = (serverPath: string) => {
    return `http://api.charliegroom.com.ua/Content/Images/${serverPath}`;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openModalClick($event, Id) {
    this.deletedId = Id;
    this.modalService.open('custom-modal-1');
  }

  public deleteImagesClick($event) {
    this.uploadDataService.deleteFile(this.deletedId).subscribe(
      data => {
        this.refresh(this.currentState);
      },
      error => {
        if (error.status === 401) {
          this.authService.logout(true);
        }
      });
    this.closeModal('custom-modal-1');
    this.router.navigate(['../ControlPanel']);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}

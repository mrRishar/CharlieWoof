import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input, AfterViewInit,  ElementRef, ViewChild } from '@angular/core';
import * as objectPath from 'object-path';
import { LayoutConfigService } from '../../../../../../core/services/layout-config.service';
import { SubheaderService } from '../../../../../../core/services/layout/subheader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UploadDataService } from '../services/upload.services';
import { NotificationService } from '../../../../services/notification.service';
import { NotificationType } from '../../../../../../enums/notification-type';
import { ModalService } from '../../../../../public/content/pages/components/notifications/services/modal.service';
import { AuthenticationService } from '../../../../../../core/auth/authentication.service';


@Component({
  selector: 'm-app-upload-files-list',
  templateUrl: './upload-files-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./upload-files-list.component.scss']
})

export class UploadFilesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('clickTable') clickTable: ElementRef;

  public loading = true;
  public deletedId = '';
  public files = [];
  public fileName = '';
  public name = '';
  public filePath = '';
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
      }, 1000);
  }

  public refresh(state: any) {
    this.currentState = state;
    this.loading = true;
    this.uploadDataService.getFiles().subscribe(
      data => {
        this.files = data.result;
        this.loading = false;
      },
      error => {
        this.loading = false;
      });
  }

  public createFilePath = (serverPath: string) => {
    return `http://api.charliegroom.com.ua/Content/Files/${serverPath}`;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openModalClick($event, Id) {
    this.deletedId = Id;
    this.modalService.open('custom-modal-1');
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  public deleteFileClick($event) {
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
}

import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as objectPath from 'object-path';
import { LayoutConfigService } from '../../../../../core/services/layout-config.service';
import { SubheaderService } from '../../../../../core/services/layout/subheader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDataService } from './services/users.services';
import { NotificationService } from '../../../services/notification.service';
import { NotificationType } from '../../../../../enums/notification-type';
import { UserModel } from './edit-page/user';
import { OnChanges } from '@angular/core';
import { AuthenticationService } from '../../../../../core/auth/authentication.service';
import { ModalService } from '../../../../public/content/pages/components/notifications/services/modal.service';
import { Location } from '@angular/common';
import { ControlPanelDataService } from '../../../services/control-panel-data.service';
// import { environmenturl } from '../../../../../../environments/environment';

@Component({
  selector: 'm-app-user-page',
  templateUrl: './user-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-page.component.scss']
})

export class UserComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('clickTable') clickTable: ElementRef;

  public loading = true;
  public clientSide = false;
  public addButton = false;
  public userSide = false;
  public showClientData = true;
  public deletedId = '';
  public totalCount = 0;
  public users: any[] = [];
  public clients: any[] = [];
  public firstname = '';
  public secondname = '';
  public email = '';
  public phone = '';
  public role = 0;
  public userId = 0;
  public selectedUsers: any[] = [];

  private subscription: Subscription = new Subscription();

  private sortField: { by: string | any, reverse: boolean } = { by: 'firstname', reverse: false };
  private currentState: any;
  private currentStatus = 0;

  public experiences: any;
  public statuses: any[] = [];
  user: UserModel = new UserModel();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    private subheaderService: SubheaderService,
    private userDataService: UserDataService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private modalService: ModalService,
    private location: Location,
    private controlPanelDataService: ControlPanelDataService,
  ) {
  }

  ngOnInit() {
    this.subscription = this.activeRoute.params.subscribe(
      params => {
      });
    this.controlPanelDataService.getUserInfo().subscribe(
      result => {
        if (result) {
          const userinfo = result.result;
          if (userinfo.role === 3) {
            this.showClientData = false;
          } else if (userinfo.role === 2) {
            this.showClientData = false;
          }
        }
      },
      error => {
        if (error.status === 400) {
          this.notificationService.notify(NotificationType.Error, 'candidateDetailsLoadError');
        }
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.clickTable.nativeElement.click();
      }, 700);
  }

  public refresh(state: any) {
    this.currentState = state;
    this.loading = true;
    if (!this.userId) {
      if (window.location.href === `http://charliegroom.com.ua/ControlPanel/Clients`) {
        this.userDataService.getClients().subscribe(
          data => {
            this.clientSide = true;
            this.users = data.result;
          });
      }
      this.userDataService.getUsers().subscribe(
        data => {
          if (window.location.href === `http://charliegroom.com.ua/ControlPanel/Grummers`) {
            this.userSide = true;
            this.addButton = true;
            this.users = data.result.filter(item => item.Role === 3);
          }
          if (window.location.href === `http://charliegroom.com.ua/ControlPanel/Users`) {
            this.userSide = true;
            this.users = data.result.filter(item => item.Role === 1);
          }
          this.totalCount = data.totalCount;
          this.loading = false;
        },
        error => {
          this.loading = false;
          if (error.status === 400) {
            this.notificationService.notify(NotificationType.Error, 'candidatesListLoadError');
          }
          if (error.status === 401) {
            this.authService.logout(true);
          }
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getFiltersList(stateFilters: any[]): any[] {
    let filterList: any[] = [];

    if (stateFilters) {
      for (const item of stateFilters) {
        filterList = filterList.concat(item['filter']);
      }
    }
    return filterList;
  }

  openModalClick($event, Id) {
    this.deletedId = Id;
    this.modalService.open('custom-modal-1');
  }

  deleteSectionClick($event) {
    this.userDataService.deleteUser(this.deletedId).subscribe(
      data => {
      },
      error => {
        if (error.status === 400) {
          this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
        }
        if (error.status === 401) {
          this.authService.logout(true);
        }
      });
    this.closeModal('custom-modal-1');
    this.location.back();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}

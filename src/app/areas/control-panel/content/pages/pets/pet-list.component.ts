import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as objectPath from 'object-path';
import { LayoutConfigService } from '../../../../../core/services/layout-config.service';
import { SubheaderService } from '../../../../../core/services/layout/subheader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PetsDataService } from './services/pets.services';
import { NotificationService } from '../../../services/notification.service';
import { NotificationType } from '../../../../../enums/notification-type';
import { Pet } from './edit-pet/pet';
import { map } from 'rxjs/internal/operators/map';
import { ModalService } from '../../../../public/content/pages/components/notifications/services/modal.service';
import { AuthenticationService } from '../../../../../core/auth/authentication.service';
import { UserDataService } from '../users/services/users.services';
import { MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'm-app-pets',
  templateUrl: './pet-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./pet-list.component.scss']
})

export class PetListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('clickTable') clickTable: ElementRef;

  public sortCandidates = [];
  public loading = true;
  public showAddBotton = false;
  public totalCount = 0;

  public config: any;

  public selectedCandidates: any[] = [];

  public pets: any = [];
  public title = '';
  public ownerName = '';
  public description = '';
  public lastUpdate = Date;

  public ownerId;
  public deletedId = '';

  public selectedSections: any[] = [];
  private subscription: Subscription = new Subscription();

  private sortField: { by: string | any, reverse: boolean } = { by: 'LastUpdate', reverse: false };
  private currentState: any;
  private currentStatus = 0;

  public experiences: any;
  public statuses: any[] = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    private subheaderService: SubheaderService,
    private petsDataService: PetsDataService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private modalService: ModalService,
    private userDataService: UserDataService,
  ) {
    this.subscription = activeRoute.params.subscribe(params => {
      this.ownerId = params['id'];
    });
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
  public updateSection($event, Id, pet) {
    this.petsDataService.updatePet(Id, pet).subscribe(
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
  }

  openModalClick($event, Id) {
    this.deletedId = Id;
    this.modalService.open('custom-modal-1');
  }

  deleteSectionClick($event) {
    this.petsDataService.deletePet(this.deletedId).subscribe(
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
    this.router.navigate(['../ControlPanel']);
  }

  public refresh(state: any) {
    this.currentState = state;
    this.loading = true;
    this.userDataService.getUsers().subscribe(
      data => {

      });
    this.petsDataService.getForOwner().subscribe(
      data => {
        if (!this.ownerId) {
          this.pets = data.result;
        } else {
          this.pets = data.result.filter(item => item.OwnerUserId === this.ownerId);
          this.showAddBotton = true;
          this.ownerName = this.pets.OwnerName;
        }
        this.totalCount = data.totalCount;
        this.loading = false;
      },
      error => {
        if (error.status === 400) {
          this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
        }
        if (error.status === 401) {
          this.authService.logout(true);
        }
      });
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

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}

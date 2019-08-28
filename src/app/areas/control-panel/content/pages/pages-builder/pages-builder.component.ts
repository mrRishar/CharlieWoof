import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as objectPath from 'object-path';
import { LayoutConfigService } from '../../../../../core/services/layout-config.service';
import { SubheaderService } from '../../../../../core/services/layout/subheader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageBuilderDataService } from './services/pages-builder.services';
import { NotificationService } from '../../../services/notification.service';
import { NotificationType } from '../../../../../enums/notification-type';
import { MagicPage } from './edit-page/magicPage';
import { map } from 'rxjs/internal/operators/map';
import { MagicContentListComponent } from './magic-content-list/magic-content-list.component';
import { ModalService } from '../../../../public/content/pages/components/notifications/services/modal.service';
import { AuthenticationService } from '../../../../../core/auth/authentication.service';


@Component({
  selector: 'm-app-pages-builder',
  templateUrl: './pages-builder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./pages-builder.component.scss']
})

export class PagesBuilderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('clickTable') clickTable: ElementRef;

  public sortCandidates = [];
  public loading = true;
  public totalCount = 0;

  public config: any;

  public selectedCandidates: any[] = [];

  public sections = [];
  public title = '';
  public description = '';
  public lastUpdate = Date;

  public sectionId = 0;
  public deletedId = '';

  public selectedSections: any[] = [];
  private subscription: Subscription = new Subscription();

  private sortField: { by: string | any, reverse: boolean } = { by: 'LastUpdate', reverse: false };
  private currentState: any;
  private currentStatus = 0;

  public experiences: any;
  public statuses: any[] = [];
  magicPage: MagicPage = new MagicPage();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    private subheaderService: SubheaderService,
    private pageBuilderDataService: PageBuilderDataService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private magicContentListComponent: MagicContentListComponent,
    private modalService: ModalService,
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

  public updateSection($event, Id, section) {
    this.pageBuilderDataService.updateSection(Id, section).subscribe(
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
    this.pageBuilderDataService.deleteSection(this.deletedId).subscribe(
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
    if (!this.sectionId) {
      this.pageBuilderDataService.getSections().subscribe(
        data => {
          this.sections = data.result;
          this.totalCount = data.totalCount;
          this.loading = false;
        },
        error => {
          this.loading = false;
          if (error.status === 400) {
          }
        });
    }
    this.selectedSections = [];
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

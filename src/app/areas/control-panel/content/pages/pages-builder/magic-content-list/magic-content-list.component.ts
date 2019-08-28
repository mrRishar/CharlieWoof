import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as objectPath from 'object-path';
import { LayoutConfigService } from '../../../../../../core/services/layout-config.service';
import { SubheaderService } from '../../../../../../core/services/layout/subheader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageBuilderDataService } from './../services/pages-builder.services';
import { NotificationService } from '../../../../services/notification.service';
import { NotificationType } from '../../../../../../enums/notification-type';
import { MagicContentItem } from './magic-content-items/magic-content-items';
import { map } from 'rxjs/internal/operators/map';
import { ModalService } from '../../../../../public/content/pages/components/notifications/services/modal.service';
import { AuthenticationService } from '../../../../../../core/auth/authentication.service';


@Component({
  selector: 'm-magic-content-list',
  templateUrl: './magic-content-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./magic-content-list.component.scss']
})

export class MagicContentListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('clickTable') clickTable: ElementRef;

  public loading = true;
  public totalCount = 0;
  public deletedId = '';

  public config: any;

  public list = [];
  public title = '';
  public description = '';
  public sectionName = '';
  public magicPageId = '';
  public updatedOnUtc = Date;
  public magicContentItemId = 0;
  magicContentItem: MagicContentItem = new MagicContentItem();

  private subscription: Subscription = new Subscription();

  private sortField: { by: string | any, reverse: boolean } = { by: 'title', reverse: false };
  private currentState: any;
  private currentStatus = 0;

  public statuses: any[] = [];
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private layoutConfigService: LayoutConfigService,
    private subheaderService: SubheaderService,
    private pageBuilderDataService: PageBuilderDataService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private modalService: ModalService,
  ) {

    this.subscription = activeRoute.params.subscribe(params => {
      this.magicPageId = params['id'];
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
    }, 1000);
  }

  public updateSection($event, Id, item) {
    console.log(Id);
    console.log(item);
    this.pageBuilderDataService.updateMagicContentItem(Id, item).subscribe(
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

  public deleteMagicContentItemClick($event) {
    this.pageBuilderDataService.deleteMagicContentItem(this.deletedId).subscribe(
      data => {
        this.refresh(this.currentState);
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
    this.router.navigate(['../ControlPanel/pagesBuilder']);
  }

  public refresh(state: any) {
    this.currentState = state;
    this.loading = true;

    if (!this.magicContentItemId) {
      this.pageBuilderDataService.getSections().subscribe(
        data => {
          const section = data.result.find(x => x.Id === this.magicPageId);
          this.sectionName = section.Title;
          this.totalCount = data.totalCount;
          this.loading = false;
        },
        error => {
          this.loading = false;
          if (error.status === 400) {
          }
        });
      this.pageBuilderDataService.getMagicContentList(this.magicPageId).subscribe(
        data => {
          this.list = data.result;
          this.totalCount = data.totalCount;
          this.loading = false;
        },
        error => {
          this.loading = false;
          if (error.status === 400) {
          }
        });
    } else {
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

  closeModal(id: string) {
    this.modalService.close(id);
  }
}

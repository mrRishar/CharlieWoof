import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as objectPath from 'object-path';
import { LayoutConfigService } from '../../../../../core/services/layout-config.service';
import { SubheaderService } from '../../../../../core/services/layout/subheader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from './services/order.services';
import { NotificationService } from '../../../services/notification.service';
import { NotificationType } from '../../../../../enums/notification-type';
import { Order } from './edit-order/order';
import { map } from 'rxjs/internal/operators/map';
import { ModalService } from '../../../../public/content/pages/components/notifications/services/modal.service';
import { AuthenticationService } from '../../../../../core/auth/authentication.service';

@Component({
  selector: 'm-app-order',
  templateUrl: './order-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./order-list.component.scss']
})

export class OrderListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('clickTable') clickTable: ElementRef;

  public loading = true;
  public showAddBotton = false;
  public totalCount = 0;
  public config: any;
  private subscription: Subscription = new Subscription();

  public id = 0;
  public expectanceOrders = [];
  public finishedOrders = [];
  public canceledOrders = [];
  public newOrders = [];
  public orders = [];
  public clientId = 0;
  public note: string = '';
  public price: string = '';
  public data: string = '';
  public petId: string = '';
  public userId: string = '';
  public userName: string = '';
  public userPhone: string = '';
  public petName: string = '';
  public deletedId = '';

  private sortField: { by: string | any, reverse: boolean } = { by: 'LastUpdate', reverse: false };
  private currentState: any;
  private currentStatus = 0;

  public experiences: any;
  public statuses: any[] = [];
  orderModel: Order = new Order();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    private subheaderService: SubheaderService,
    private orderService: OrderService,
    private activeRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private modalService: ModalService,
  ) {
    this.subscription = activeRoute.params.subscribe(params => {
      this.clientId = params['id'];
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
    setTimeout(() => {
      this.clickTable.nativeElement.click();
    }, 4000);
  }

  public updateOrder($event, Id, orderItem) {
    this.orderService.updateOrder(Id, orderItem).subscribe(
      data => { },
      error => {
        if (error.status === 400) {
          this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
        }
        if (error.status === 401) {
          this.authService.logout(true);
        }
      });
  }

  public refresh(state: any) {
    this.currentState = state;
    this.loading = true;

    this.orderService.getOrdersWithName().subscribe(
      data => {
        if (!this.clientId) {
          this.orders = data.result;
          this.newOrders = data.result.filter(x => x.Status === 1);
          this.expectanceOrders = data.result.filter(x => x.Status === 2);
          this.finishedOrders = data.result.filter(x => x.Status === 3);
          this.canceledOrders = data.result.filter(x => x.Status === 4);
        } else {
          const orders = data.result.filter(x => x.UserId === this.clientId);
          this.newOrders = orders.filter(x => x.Status === 1);
          this.expectanceOrders = orders.filter(x => x.Status === 2);
          this.finishedOrders = orders.filter(x => x.Status === 3);
          this.canceledOrders = orders.filter(x => x.Status === 4);
          this.showAddBotton = true;
        }
      },
      error => {
        if (error.status === 400) {
          this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
        }
        if (error.status === 401) {
          this.authService.logout(true);
        }
      });
    this.loading = false;
  }

  // public filterStatus(status) {
  //   debugger
  //   setTimeout(() => {
  //     this.clickTable.nativeElement.click();
  //   }, 700);
  //   // this.router.navigate(['../ControlPanel/Orders']);
  //   this.orderService.getOrdersWithName().subscribe(
  //     data => {
  //       if (!this.clientId) {
  //         this.orders = data.result.filter(x => x.Status === status);
  //       } else {
  //         const a = data.result.filter(x => x.UserId === this.clientId);
  //         this.orders = a.filter(x => x.Status === status);
  //       }
  //     },
  //     error => {
  //       if (error.status === 400) {
  //         this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
  //       }
  //       if (error.status === 401) {
  //         this.authService.logout(true);
  //       }
  //     });
  // }

  openModalClick($event, Id) {
    this.deletedId = Id;
    this.modalService.open('custom-modal-1');
  }

  deleteSectionClick($event) {
    this.orderService.deleteOrder(this.deletedId).subscribe(
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


  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

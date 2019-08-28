import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClarityModule } from '@clr/angular';

import { OrderListComponent } from './order-list.component';
import { ModalForOrdersComponent } from '../../../../public/content/pages/components/notifications/directives/modalForOrders.component';

import { LayoutModule } from '../../../content/layout/layout.module';
import { PartialsModule } from '../../../../../content/partials/partials.module';
import { ListTimelineModule } from '../../../../../content/partials/layout/quick-sidebar/list-timeline/list-timeline.module';
import { WidgetChartsModule } from '../../../../../content/partials/content/widgets/charts/widget-charts.module';

import { ModalService } from '../../../../public/content/pages/components/notifications/services/modal.service';
import { ValidationService } from '../../../../services/validation-service';
import { OrderPageComponent } from './edit-order/order-page.component';
import { OrderService } from './services/order.services';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material';
import { HighlightModule } from 'ngx-highlightjs';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
	imports: [
		NgbModule,
		MatTabsModule,
		HighlightModule,
		PerfectScrollbarModule,
		CommonModule,
		LayoutModule,
		PartialsModule,
		ListTimelineModule,
		WidgetChartsModule,
		RouterModule.forChild([
			{
				path: '',
				component: OrderListComponent
			},
			{
				path: 'clientOrders/:id',
				component: OrderListComponent
			},
			{
				path: 'edit/:id',
				component: OrderPageComponent
			},
			{
				path: 'newOrder/:id',
				component: OrderPageComponent
			},
		]),
		FormsModule,
		ReactiveFormsModule,
		ClarityModule,
		HttpClientModule,
		TranslateModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [
		OrderService,
		ValidationService,
		ModalService,
	],
	declarations: [
		OrderListComponent,
		ModalForOrdersComponent,
		OrderPageComponent
	]
})
export class OrderModule { }

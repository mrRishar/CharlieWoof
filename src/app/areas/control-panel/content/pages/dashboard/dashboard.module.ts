import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../content/layout/layout.module';
import { PartialsModule } from '../../../../../content/partials/partials.module';
import { ListTimelineModule } from '../../../../../content/partials/layout/quick-sidebar/list-timeline/list-timeline.module';
import { WidgetChartsModule } from '../../../../../content/partials/content/widgets/charts/widget-charts.module';
import { LayoutBuilderModule } from './../../pages/layuot-builder/layout-builder.module';

// export const dashboardRoutes = [
// 	{ path: 'dashboard', component: DashboardComponent}
// ];

@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		PartialsModule,
		ListTimelineModule,
		WidgetChartsModule,
		LayoutBuilderModule,
		// RouterModule.forChild([
		// 	{
		// 		path: '',
		// 		component: DashboardComponent
		// 	}
		// ])
	],
	providers: [],
	declarations: [DashboardComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CPDashboardModule { }

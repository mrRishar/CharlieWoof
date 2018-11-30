import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesBuilderComponent } from './pages-builder.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../content/layout/layout.module';
import { PartialsModule } from '../../../../../content/partials/partials.module';
import { ListTimelineModule } from '../../../../../content/partials/layout/quick-sidebar/list-timeline/list-timeline.module';
import { WidgetChartsModule } from '../../../../../content/partials/content/widgets/charts/widget-charts.module';

@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		PartialsModule,
		ListTimelineModule,
		WidgetChartsModule,
		RouterModule.forChild([
			{
				path: '',
				component: PagesBuilderComponent
			}
		])
	],
	providers: [],
	declarations: [PagesBuilderComponent]
})
export class PagesBuilderModule { }

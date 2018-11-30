import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { LayoutBuilderComponent } from './layout-builder.component';
import { PartialsModule } from '../../../../../content/partials/partials.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material';
import { HighlightModule } from 'ngx-highlightjs';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		PartialsModule,
		FormsModule,
		NgbModule,
		MatTabsModule,
		PerfectScrollbarModule,
		HighlightModule.forRoot({ theme: 'googlecode' }),
		RouterModule.forChild([
			{
				path: '',
				component: LayoutBuilderComponent
			}
		])
	],
	providers: [],
	declarations: [LayoutBuilderComponent]
})
export class LayoutBuilderModule {}

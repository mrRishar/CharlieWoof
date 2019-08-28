import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../../content/layout/layout.module';
import { PartialsModule } from '../../../../../content/partials/partials.module';
import { ListTimelineModule } from '../../../../../content/partials/layout/quick-sidebar/list-timeline/list-timeline.module';
import { WidgetChartsModule } from '../../../../../content/partials/content/widgets/charts/widget-charts.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { UploadDataService } from './services/upload.services';
import { HttpClientModule } from '@angular/common/http';
import { ValidationService } from '../../../../services/validation-service';
import { UploadImagesComponent } from './upload-images-list/upload-images-list.component';
import { UploadComponent } from './upload-files-img/upload-page.component';
import { UploadFilesComponent } from './upload-files-list/upload-files-list.component';
import { ModalService } from '../../../../public/content/pages/components/notifications/services/modal.service';
import { ModalForFilesComponent } from '../../../../public/content/pages/components/notifications/directives/modalForFiles.component';

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
				component: UploadComponent
			},
			{
				path: 'UploadFiles',
				component: UploadFilesComponent
			},
			{
				path: 'UploadImages',
				component: UploadImagesComponent
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
		UploadDataService,
		ValidationService,
		ModalService
	],
	declarations: [
		UploadComponent,
		UploadFilesComponent,
		UploadImagesComponent,
		ModalForFilesComponent,
	]
})
export class UploadModule { }

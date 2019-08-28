import { CommonModule } from '@angular/common';
import { PagesBuilderComponent } from './pages-builder.component';
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

import { MagicContentItemComponent } from './magic-content-list/magic-content-items/magic-content-items.component';
import { MagicContentListComponent } from './magic-content-list/magic-content-list.component';
import { SectionPageComponent } from './edit-page/section-page.component';
// import { CandidatePageComponent } from '../candidates/components/candidate-page/candidate-page.component';
// import { TransformBirthDateToAgePipe } from './components/candidates-list/transform-birthdate-to-age.pipe';
// import { AuthGuard } from '../../services/authguard.service';
// import { FiltersModule } from '../filters/filters.module';

import { PageBuilderDataService } from './services/pages-builder.services';
// import { EnumDataService } from '../../services/enum.data.service';
import { HttpClientModule } from '@angular/common/http';
import { ValidationService } from '../../../../services/validation-service';
import { ModalForCPComponent } from '../../../../public/content/pages/components/notifications/directives/modalForCP.component';
import { ModalService } from '../../../../public/content/pages/components/notifications/services/modal.service';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

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
			},
			{
				path: 'edit/:id',
				component: SectionPageComponent
			},
			{
				path: 'newSection',
				component: SectionPageComponent
			},
			{
				path: 'contentList/:id',
				component: MagicContentListComponent
			},
			{
				path: 'contentList/magicContentItem/:id',
				component: MagicContentItemComponent
			},
			{
				path: 'magicContentItem/newContentItem/:magicPageId',
				component: MagicContentItemComponent
			},
		]),
		FormsModule,
		ReactiveFormsModule,
		// FiltersModule,
		ClarityModule,
		// BrowserAnimationsModule,
		HttpClientModule,
		TranslateModule,
		//FroalaEditorModule.forRoot(),
		//FroalaViewModule.forRoot(),
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [
		PageBuilderDataService,
		ValidationService,
		MagicContentListComponent,
		ModalService,
	],
	declarations: [
		PagesBuilderComponent,
		SectionPageComponent,
		MagicContentItemComponent,
		MagicContentListComponent,
		ModalForCPComponent,
		// CandidatesListComponent,
		// CandidatePageComponent,
		// TransformBirthDateToAgePipe
	]
})
export class PagesBuilderModule { }

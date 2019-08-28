import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutModule } from '../../../content/layout/layout.module';
import { PartialsModule } from '../../../../../content/partials/partials.module';
import { ListTimelineModule } from '../../../../../content/partials/layout/quick-sidebar/list-timeline/list-timeline.module';
import { WidgetChartsModule } from '../../../../../content/partials/content/widgets/charts/widget-charts.module';

import { UserComponent } from './user-page.component';
import { UserEditPageComponent } from './edit-page/user-edit-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ModalForClientComponent } from '../../../../public/content/pages/components/notifications/directives/modalForClient.component';

import { UserDataService } from './services/users.services';
import { ValidationService } from '../../../../services/validation-service';
import { ModalService } from '../../../../public/content/pages/components/notifications/services/modal.service';

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
				component: UserComponent
			},
			{
				path: 'edit/:id',
				component: UserEditPageComponent
			},
			{
				path: 'newUser',
				component: UserEditPageComponent
			},
			{
				path: 'changePassword/:id',
				component: ChangePasswordComponent
			}
		]),
        FormsModule,
        ReactiveFormsModule,
        // FiltersModule,
        ClarityModule,
        // BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule,
		// FroalaEditorModule.forRoot(),
		// FroalaViewModule.forRoot(),
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [
		UserDataService,
		ValidationService,
		ModalService,
	],
	declarations: [
		UserComponent,
		UserEditPageComponent,
		ChangePasswordComponent,
		ModalForClientComponent
		// CandidatesListComponent,
        // CandidatePageComponent,
		// TransformBirthDateToAgePipe
	]
})
export class UserModule { }

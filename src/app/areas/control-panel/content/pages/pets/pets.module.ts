import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClarityModule } from '@clr/angular';

import { LayoutModule } from '../../../content/layout/layout.module';
import { PartialsModule } from '../../../../../content/partials/partials.module';
import { ListTimelineModule } from '../../../../../content/partials/layout/quick-sidebar/list-timeline/list-timeline.module';
import { WidgetChartsModule } from '../../../../../content/partials/content/widgets/charts/widget-charts.module';

import { ModalService } from '../../../../public/content/pages/components/notifications/services/modal.service';
import { ValidationService } from '../../../../services/validation-service';

import { PetListComponent } from './pet-list.component';
import { PetComponent } from './edit-pet/pet-page.component';
import { OrderListComponent } from '../order/order-list.component';
import { ModalForPetComponent } from '../../../../public/content/pages/components/notifications/directives/modalForPet.component';
import { PetsDataService } from './services/pets.services';


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
				component: PetListComponent
			},
			{
				path: 'clientPets/:id',
				component: PetListComponent
			},
			{
				path: 'edit/:id',
				component: PetComponent
			},
			{
				path: 'newPet/:id',
				component: PetComponent
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
		PetsDataService,
		ValidationService,
		ModalService,
	],
	declarations: [
		PetListComponent,
		PetComponent,
		ModalForPetComponent,
	]
})
export class PetsModule { }

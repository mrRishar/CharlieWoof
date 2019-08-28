import { LayoutModule } from './content/layout/layout.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelRoutingModule } from './cp-routing.module';
import { ControlPanelComponent } from './control-panel.component';
import { PartialsModule } from './../../content/partials/partials.module';
import { CoreModule } from '../../core/core.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CPDashboardModule } from './content/pages/dashboard/dashboard.module';
import { PagesBuilderModule } from './content/pages/pages-builder/pages-builder.module';
import { LayoutBuilderModule } from './content/pages/layuot-builder/layout-builder.module';
import { ControlPanelDataService } from './services/control-panel-data.service';
import { AuthGuard } from './../control-panel/services/authguard.service';
import { UserModule } from './content/pages/users/user-page.module';
import { ClarityModule } from '@clr/angular';
import { UploadModule } from './content/pages/upload/upload-page.module';
import { OrderModule } from './content/pages/order/order.module';
import { PetsModule } from './content/pages/pets/pets.module';

@NgModule({
	declarations: [
		ControlPanelComponent,
		// ErrorPageComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		PagesBuilderModule,
		FormsModule,
		ControlPanelRoutingModule,
		CoreModule,
		LayoutModule,
		PartialsModule,
		CPDashboardModule,
		AngularEditorModule,
		LayoutBuilderModule,
		ClarityModule,
		UserModule,
		UploadModule,
		OrderModule,
		PetsModule
		// AuthModule
	],
	providers: [
		ControlPanelDataService,
		AuthGuard,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ControlPanelModule {
}

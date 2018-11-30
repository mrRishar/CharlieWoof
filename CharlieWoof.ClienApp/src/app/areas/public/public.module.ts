import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PublicComponent} from './public.component';
// import { LayoutModule } from '../public/content/layout/layout.module';
// import { IndexComponent } from './index/index.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicPagesModule } from '../public/content/pages/public-pages.module';
import { PartialsModule } from './../../content/partials/partials.module';



@NgModule({
	declarations: [
		PublicComponent,
		// StickyHeaderComponent
		// IndexComponent
	],
	imports: [
		CommonModule,
		// LayoutModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PublicPagesModule,
		AngularEditorModule,
		PublicRoutingModule,
		PartialsModule
	],
	providers: []
})
export class PublicModule {
}

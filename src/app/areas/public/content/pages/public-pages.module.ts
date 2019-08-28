// import { LayoutModule } from '../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { PublicPagesRoutingModule } from './public-pages-routing.module';
import { PublicPagesComponent } from './public-pages.component';
import { StickyHeaderComponent} from './components/sticky-header/sticky-header.component';
import { WelcomeSectionComponent} from './components/welcome-section/welcome-section.component';
import { FeaturedSectionComponent} from './components/featured-section/featured-section.component';
import { ServicesSectionComponent} from './components/services-section/services-section.component';
import { AppointmentSectionComponent} from './components/appointment-section/appointment-section.component';
import { TeamSectionComponent} from './components/team-section/team-section.component';
import { PricingSectionComponent} from './components/pricing-section/pricing-section.component';
import { SavePetsSectionComponent} from './components/save-pets-section/save-pets-section.component';
import { FluidSectionComponent} from './components/fluid-section/fluid-section.component';
import { TestimonialSectionComponent} from './components/testimonial-section/testimonial-section.component';
import { SliderSectionComponent} from './components/slider-section/slider-section.component';
import { CounterSectionComponent} from './components/counter-section/counter-section.component';
import { PartialsModule } from './../../../../content/partials/partials.module';
import { ContactSectionComponent} from './components/contact-section/contact-section.component';
import { AgmCoreModule } from '@agm/core';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { HeaderComponent } from './../layout/header/header.component';
import { FooterComponent } from './../layout//footer/footer.component';
import { TopbarComponent } from './../layout/header/topbar/topbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { EnumDataService } from './../../../services/enams.service';

// import { PartialsModule } from '../partials/partials.module';
// import { ActionComponent } from './header/action/action.component';
// import { ProfileComponent } from './header/profile/profile.component';
// import { CoreModule } from '../../core/core.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
// import { ErrorPageComponent } from '../../../../content/pages/snippets/error-page/error-page.component';
// import { InnerComponent } from './components/inner/inner.component';
import { RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { IndexDataService } from './../../services/index-data.service';
import { ModalService } from '../pages/components/notifications/services/modal.service';
import { ModalComponent } from '../pages/components/notifications/directives/modal.component';
import { PageBuilderDataService } from '../../../control-panel/content/pages/pages-builder/services/pages-builder.services';
import { ScrollSpyDirective } from './components/scroll-directive';




@NgModule({
	declarations: [
		PublicPagesComponent,
		StickyHeaderComponent,
		WelcomeSectionComponent,
		FeaturedSectionComponent,
		ServicesSectionComponent,
		AppointmentSectionComponent,
		TeamSectionComponent,
		SavePetsSectionComponent,
		FluidSectionComponent,
		TestimonialSectionComponent,
		SliderSectionComponent,
		CounterSectionComponent,
		PricingSectionComponent,
		ContactSectionComponent,
		HeaderComponent,
 		FooterComponent,
		TopbarComponent,

		// ScrollTopComponent,
		// ActionComponent,
		// ProfileComponent,
		// ErrorPageComponent,
		// InnerComponent,
		ModalComponent,
		ScrollSpyDirective,
	],
	imports: [
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyDXARWg8C9sD4oe6Tt_IyaTJW-pwXtLkOM'
		  }),
		Ng2PageScrollModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		PublicPagesRoutingModule,
		// CoreModule,
		// LayoutModule,
		PartialsModule,
		AngularEditorModule,
		RouterModule.forChild([
			{
				path: '',
				component: PublicPagesComponent
			}
		]),
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
	],
	providers: [
		IndexDataService,
		ModalService,
		PageBuilderDataService,
		EnumDataService,
	]
})
export class PublicPagesModule {
}

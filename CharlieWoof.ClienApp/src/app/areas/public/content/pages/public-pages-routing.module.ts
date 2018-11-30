import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPagesComponent } from './public-pages.component';
// import { ActionComponent } from './header/action/action.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
// import { ProfileComponent } from './header/profile/profile.component';
import { ErrorPageComponent } from '../../../../content/pages/snippets/error-page/error-page.component';
// import { InnerComponent } from "./components/inner/inner.component";
import { TopbarComponent } from "../layout/header/topbar/topbar.component";
import { PricingSectionComponent } from "../pages/components/pricing-section/pricing-section.component";


const routes: Routes = [
	{
		path: '',
		component: PublicPagesComponent,
		// Remove comment to enable login
		// canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: ['ADMIN', 'USER'],
				except: ['GUEST'],
				redirectTo: '/login'
			}
		},
		children: [
			{
				path: '#1',
				component: TopbarComponent
			},
			{
				path: '#2',
				component: PricingSectionComponent
			},
			{
				path: '#3',
				component: PricingSectionComponent
			},
			{
				path: '#4',
				component: PricingSectionComponent
			},
			{
				path: '#5',
				component: PricingSectionComponent
			},
			{
				path: '#6',
				component: PricingSectionComponent
			},

		]
	},
	// {
	// 	path: 'login',
	// 	// canActivate: [NgxPermissionsGuard],
	// 	loadChildren: './auth/auth.module#AuthModule',
	// 	data: {
	// 		permissions: {
	// 			except: 'ADMIN'
	// 		}
	// 	},
	// },
	// {
	// 	path: '404',
	// 	component: ErrorPageComponent
	// },
	// {
	// 	path: 'error/:type',
	// 	component: ErrorPageComponent
	// },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PublicPagesRoutingModule {
}

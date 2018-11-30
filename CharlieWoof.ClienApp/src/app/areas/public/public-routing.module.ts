import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
// import { ActionComponent } from './header/action/action.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
// import { ProfileComponent } from './header/profile/profile.component';
// import { ErrorPageComponent } from './../../../app/content/pages/snippets/error-page/error-page.component';
// import { InnerComponent } from "./components/inner/inner.component";

import { TopbarComponent } from "../public/content/layout/header/topbar/topbar.component";

const routes: Routes = [
	{
		path: '',
		component: PublicComponent,
		// Remove comment to enable login
		// canActivate: [NgxPermissionsGuard],
		// data: {
		// 	permissions: {
		// 		only: ['ADMIN', 'USER'],
		// 		except: ['GUEST'],
		// 		redirectTo: '/login'
		// 	}
		// },
		children: [
			{
				path: 'cours_of_crumming', component: TopbarComponent
			},
			{
				path: 'index',	loadChildren: './content/pages/public-pages.module#PublicPagesModule'
			},
			// {
			// 	path: 'indexs',
			// 	component: PublicComponent
			// },
			// {
			// 	path: 'builder',
			// 	loadChildren: './builder/builder.module#BuilderModule'
			// },
			// {
			// 	path: 'header/actions',
			// 	component: ActionComponent
			// },
			// {
			// 	path: 'profile',
			// 	component: ProfileComponent
			// },
			// {
			// 	path: 'inner',
			// 	component: InnerComponent
			// },
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
export class PublicRoutingModule {
}

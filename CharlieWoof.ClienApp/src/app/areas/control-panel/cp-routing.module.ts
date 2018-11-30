import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlPanelComponent } from './control-panel.component';
// import { ActionComponent } from './header/action/action.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
// import { ProfileComponent } from './header/profile/profile.component';
import { ErrorPageComponent } from './../../../app/content/pages/snippets/error-page/error-page.component';
// import { InnerComponent } from "./components/inner/inner.component";
import { AuthGuard } from './../control-panel/services/authguard.service';

const routes: Routes = [
	{
		path: '',
		component: ControlPanelComponent,
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
				path: 'ControlPanel',
				loadChildren: '../control-panel/content/pages/dashboard/dashboard.module#CPDashboardModule'
				// , canActivate: [AuthGuard]
			},

			{
				path: 'ControlPanel/pagesBuilder',
				loadChildren: './../../areas/control-panel/content/pages/pages-builder/pages-builder.module#PagesBuilderModule'
				// , canActivate: [AuthGuard]
			},

			{
				path: 'ControlPanel/layoutBuilder',
				loadChildren: './content/pages/layuot-builder/layout-builder.module#LayoutBuilderModule'
				// , canActivate: [AuthGuard]
			},

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
	{
		path: 'login',
		canActivate: [NgxPermissionsGuard],
		loadChildren: '../../content/pages/auth/auth.module#AuthModule',
		data: {
			permissions: {
				except: 'ADMIN'
			}
		},
	},
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
export class ControlPanelRoutingModule {
}

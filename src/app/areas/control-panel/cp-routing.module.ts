import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlPanelComponent } from './control-panel.component';
// import { ActionComponent } from './header/action/action.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
// import { ProfileComponent } from './header/profile/profile.component';
import { ErrorPageComponent } from './../../../app/content/pages/snippets/error-page/error-page.component';
// import { InnerComponent } from "./components/inner/inner.component";
import { AuthGuard } from './../control-panel/services/authguard.service';
import { RegisterComponent } from './../../content/pages/auth/register/register.component';
import { UploadFilesComponent } from './content/pages/upload/upload-files-list/upload-files-list.component';

const routes: Routes = [
	{
		path: 'ControlPanel',
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
				path: '',
				loadChildren:  './../../areas/control-panel/content/pages/order/order.module#OrderModule'
				, canActivate: [AuthGuard]
			},

			{
				path: 'pagesBuilder',
				loadChildren: './../../areas/control-panel/content/pages/pages-builder/pages-builder.module#PagesBuilderModule'
				, canActivate: [AuthGuard]
			},

			{
				path: 'layoutBuilder',
				loadChildren: './content/pages/layuot-builder/layout-builder.module#LayoutBuilderModule'
				, canActivate: [AuthGuard]
			},

			{
				path: 'Orders',
				loadChildren: './../../areas/control-panel/content/pages/order/order.module#OrderModule'
				, canActivate: [AuthGuard]
			},

			{
				path: 'Pets',
				loadChildren: './../../areas/control-panel/content/pages/pets/pets.module#PetsModule'
				, canActivate: [AuthGuard]
			},

			{
				path: 'Users',
				loadChildren: './../../areas/control-panel/content/pages/users/user-page.module#UserModule'
				, canActivate: [AuthGuard]
			},

			{
				path: 'Clients',
				loadChildren: './../../areas/control-panel/content/pages/users/user-page.module#UserModule'
				, canActivate: [AuthGuard],
			},

			{
				path: 'Grummers',
				loadChildren: './../../areas/control-panel/content/pages/users/user-page.module#UserModule'
				, canActivate: [AuthGuard],
			},

			{
				path: 'Upload',
				loadChildren: './../../areas/control-panel/content/pages/upload/upload-page.module#UploadModule'
				, canActivate: [AuthGuard]
			}
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
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ControlPanelRoutingModule {
}

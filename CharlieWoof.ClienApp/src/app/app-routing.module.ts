import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {  PublicPagesComponent} from '../app/areas/public/content/pages/public-pages.component';
// import { AuthGuard } from './areas/control-panel/services/authguard.service';


const routes: Routes = [
	// {	path: '', loadChildren: 'app/content/pages/pages.module#PagesModule'},
	// {	path: '', redirectTo: '/index'},
    {	path: '', loadChildren: 'app/areas/public/content/pages/public-pages.module#PublicPagesModule'},
	// {	path: '', loadChildren: 'app/areas/public/public.module#PublicModule'},
	{	path: '', loadChildren: 'app/areas/control-panel/control-panel.module#ControlPanelModule'},
	// {	path: 'cp', redirectTo: 'ControlPanel' },
	// {	path: '', loadChildren: 'app/content/pages/pages.module#PagesModule'},
	{	path: '**',	redirectTo: '404'}
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}

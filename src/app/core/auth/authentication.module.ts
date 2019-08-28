import { NgModule } from '@angular/core';
import {
	AUTH_SERVICE,
	AuthModule,
	PROTECTED_FALLBACK_PAGE_URI,
	PUBLIC_FALLBACK_PAGE_URI
} from 'ngx-auth';

import { TokenStorage } from './token-storage.service';
import { AuthenticationService } from './authentication.service';
import { AuthenService } from './../../../app/areas/control-panel/services/authen.service';


export function factory(authenticationService: AuthenticationService) {
	return authenticationService;
}

@NgModule({
	imports: [AuthModule],
	providers: [
		TokenStorage,
		AuthenticationService,
		AuthenService,
		{ provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/ControlPanel' },
		{ provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/login' },
		{
			provide: AUTH_SERVICE,
			deps: [AuthenticationService],
			useFactory: factory
		}
	]
})
export class AuthenticationModule {}

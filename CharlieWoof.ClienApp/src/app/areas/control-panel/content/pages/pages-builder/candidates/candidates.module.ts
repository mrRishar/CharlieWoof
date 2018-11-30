import { TranslateModule } from '@ngx-translate/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ClarityModule } from '@clr/angular';

import { CandidatesListComponent } from '../candidates/components/candidates-list/candidates-list.component';
import { CandidatePageComponent } from '../candidates/components/candidate-page/candidate-page.component';
import { TransformBirthDateToAgePipe } from './components/candidates-list/transform-birthdate-to-age.pipe';
// import { AuthGuard } from '../../services/authguard.service';
// import { FiltersModule } from '../filters/filters.module';

import { CandidatesDataService } from './services/candidates-data.service';
// import { EnumDataService } from '../../services/enum.data.service';

import { HttpClientModule } from '@angular/common/http';

export const candidateRoutes = [
    { path: 'candidates', component: CandidatesListComponent },
    { path: 'candidates/details/:id', component: CandidatePageComponent},
    { path: 'candidates/newcandidate', component: CandidatePageComponent},
    { path: 'candidates/vacancy/:vacancyId/stage/:stageId', component: CandidatesListComponent },
];

@NgModule({
    declarations: [
        CandidatesListComponent,
        CandidatePageComponent,
        TransformBirthDateToAgePipe
    ],
    providers: [
        CandidatesDataService,
        // EnumDataService
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        // FiltersModule,
        // ClarityModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CandidatesModule {
}

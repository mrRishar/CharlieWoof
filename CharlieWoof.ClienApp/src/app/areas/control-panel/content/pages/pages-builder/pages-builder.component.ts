import * as objectPath from "object-path";
import { LayoutConfigService } from "../../../../../core/services/layout-config.service";
import { SubheaderService } from "../../../../../core/services/layout/subheader.service";
import {
	Component,
	Input,
	OnInit,
	OnDestroy,
	ChangeDetectionStrategy
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

// import { Comparator, State, Filter } from '@clr/angular';

// import { Subscription } from 'rxjs/Subscription';

import { CandidatesDataService } from './candidates/services/candidates-data.service';

@Component({
	selector: "m-app-pages-builder",
	templateUrl: "./pages-builder.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
	// styleUrls: ['./index.component.scss']
})
export class PagesBuilderComponent implements OnInit, OnDestroy {
	public config: any;
	public sortCandidates = [];
	public candidates = [];
	public loading = true;
	public selectedCandidates: any[] = [];
	// public deleted = StatusCommands.DELETED;
	// public archived = StatusCommands.ARCHIVED;
	// public active = StatusCommands.ACTIVE;

	private vacancyId = 0;
	private stageId = 0;
	// private subscription: Subscription = new Subscription();

	public totalCount = 0;
	private sortField: { by: string | any; reverse: boolean } = {
		by: "lastName",
		reverse: false
	};
	private currentState: any;
	private currentStatus = 0;

	public experiences: any;
	public statuses: any[] = [];

	constructor(
		private router: Router,
		private layoutConfigService: LayoutConfigService,
		private subheaderService: SubheaderService,
		private candidatesDataService: CandidatesDataService,
		private activeRoute: ActivatedRoute
	) {}

	ngOnInit() {
		// this.subscription = this.activeRoute.params.subscribe(
		//     params => {
		//         this.vacancyId = params['vacancyId'];
		//         this.stageId = params['stageId'];
		//     });
		// this.enumService.getEnums(EnumNames.EXPERIENCE).subscribe(
		//     data => {
		//         if (data) {
		//             this.experiences = data.result;
		//         }
		//     }, error => {
		//         if (error.status === 400) {
		//             this.notificationService.notify(NotificationType.Error, 'experienceLoadError');
		//         }
		//     });
		// this.enumService.getEnums(EnumNames.STATUSTYPE).subscribe(
		//     data => {
		//         if (data) {
		//             this.statuses = data.result;
		//         }
		//     }, error => {
		//         if (error.status === 400) {
		//             this.notificationService.notify(NotificationType.Error, 'statusLoadError');
		//         }
		//     });
	}

	public getVacanciesByStatusType(event, status: number) {
		this.currentStatus = status;
		this.refresh(this.currentState);
	}

	public changeStatus($event, candidates, status) {
		// this.candidatesDataService.changeCandidateStatus(candidates.map(arr => arr.id), status).subscribe(
		//     data => {
		//         if (data) {
		//             this.notificationService.notify(NotificationType.Success,
		//                 candidates.length === 1 ? 'candidateChangeStatusSucces' : 'candidatesChangeStatusSucces');
		//             this.refresh(this.currentState);
		//         }
		//     },
		//     error => {
		//         if (error.status === 400) {
		//             this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
		//         }
		//     });
	}

	public refresh(state: any) {
		this.currentState = state;
		this.loading = true;
		if (state.sort) {
			this.sortField = state.sort;
		}

		const filters = this.getFiltersList(this.currentState.filters);

		// const gridRequest: GridRequest = {
		//     take: this.currentState.page.size,
		//     skip: this.currentState.page.from,
		//     sortField: this.sortField.by.toString(),
		//     sortDir: this.sortField.reverse === true ? 'desc' : 'asc',
		//     filters: filters
		// };

		// if (!this.vacancyId && !this.stageId) {
		//     this.candidatesDataService.getCandidates(this.currentStatus, gridRequest).subscribe(
		//         data => {
		//             this.candidates = data.result;
		//             this.totalCount = data.totalCount;
		//             this.loading = false;
		//         },
		//         error => {
		//             this.loading = false;
		//             if (error.status === 400) {
		//                 this.notificationService.notify(NotificationType.Error, 'candidatesListLoadError');
		//             }

		//         });
		// } else {
		//     this.candidatesDataService.getCandidateByVacancyStage(this.vacancyId, this.stageId).subscribe(
		//         data => {
		//             this.candidates = data.result;
		//             this.totalCount = data.totalCount;
		//             this.loading = false;
		//         },
		//         error => {
		//             this.loading = false;
		//             if (error.status === 400) {
		//                 this.notificationService.notify(NotificationType.Error, 'candidatesListLoadError');
		//             }
		//         });
		// }

		this.selectedCandidates = [];
	}

	ngOnDestroy() {
		// this.subscription.unsubscribe();
	}

	public getFiltersList(stateFilters: any[]): any[] {
		let filterList: any[] = [];

		if (stateFilters) {
			for (const item of stateFilters) {
				filterList = filterList.concat(item["filter"]);
			}
		}
		return filterList;
	}
}

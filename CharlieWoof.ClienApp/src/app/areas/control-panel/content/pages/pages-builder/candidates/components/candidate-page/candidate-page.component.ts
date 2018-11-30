import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CandidatesDataService } from '../../services/candidates-data.service';
// import { ValidationService } from '../../../../services/validation.service';
// import { NotificationService } from '../../../../services/notification.service';
// import { NotificationType } from '../../../../enums/notification-type';
// import { EnumDataService } from '../../../../services/enum.data.service';
// import { EnumNames } from '../../../../constants/enum-names';
// import { VacanciesDataService } from '../../../vacancies/services/vacancies-data.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

@Component({
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss']
})
export class CandidatePageComponent implements OnInit, OnDestroy {

  public setStageModalVisible = false;

  private id = 0;
  private subscription: Subscription = new Subscription();
  private experienceId = 0;
  private technologyIds: any[] = [];

  // private experienceEnumName = EnumNames.EXPERIENCE;
  // private stageEnumName = EnumNames.VACANCYSTAGE;

  public experiences: any[] = [];
  public technologies: any[] = [];
  public vacancyStages: any[] = [];
  public vacancies: any[] = [];
  public candidateVacancyStage: any[] = [];
  public vacanciesOfCadidate: any[] = [];
  public vacanciesForTheChoice: any[] = [];
  public selectedVacanciesOfCandidate: any[] = [];
  public candidateVacancy: any[] = [];

  public candidatePageFrom: FormGroup = new FormGroup({
    'id': new FormControl(''),
    'experienceId': new FormControl(0, Validators.required),
    'firstName': new FormControl('', Validators.required),
    'lastName': new FormControl('', Validators.required),
    'technologyIds': new FormControl([]),
    'email': new FormControl(''),
    'skype': new FormControl(''),
    'linkedIn': new FormControl(''),
    'phone': new FormControl(''),
    'cvPath': new FormControl(''),
  });

  public candidateAttachVacancyForm: FormGroup = new FormGroup({
    'vacancyId': new FormControl('', Validators.required),
    'vacancyStage': new FormControl('', Validators.required)
  });

  constructor(private candidatesDataService: CandidatesDataService,
    // private vacanciesDataService: VacanciesDataService,
    // private enumService: EnumDataService,
     private activeRoute: ActivatedRoute,
    // public validationService: ValidationService,
     private router: Router,
    // private notificationService: NotificationService
  ) {

    this.subscription = activeRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    if (this.id) {
      this.candidatesDataService.getCandidate(this.id).subscribe(
        candidate => {
          if (candidate) {
            this.setFormData(candidate);
            this.experienceId = candidate.experienceId;
            this.technologyIds = candidate.technologyIds ? candidate.technologyIds : [];
          }
        },
        error => {
          if (error.status === 400) {
           // this.notificationService.notify(NotificationType.Error, 'candidateDetailsLoadError');
          }
        });

    }

    // this.enumService.getEnums(this.experienceEnumName).subscribe(
    //   data => {
    //     this.experiences = data.result;
    //   },
    //   error => {
    //     if (error.status === 400) {
    //       this.notificationService.notify(NotificationType.Error, 'experienceLoadError');
    //     }
    //   });

    // this.enumService.getEnums(this.stageEnumName).subscribe(
    //   data => {
    //     this.vacancyStages = data.result;
    //   },
    //   error => {
    //     if (error.status === 400) {
    //       this.notificationService.notify(NotificationType.Error, 'vacancyStageLoadError');
    //     }
    //   });

    this.candidatesDataService.getTechnologies().subscribe(
      data => {
        this.technologies = data;
      },
      error => {
        if (error.status === 400) {
         // this.notificationService.notify(NotificationType.Error, 'technologiesLoadError');
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private setFormData(candidate) {

    this.candidatePageFrom.setValue({
      'id': candidate.id,
      'experienceId': candidate.experienceId,
      'firstName': candidate.firstName,
      'lastName': candidate.lastName,
      'technologyIds': candidate.technologyIds ? candidate.technologyIds : [],
      'email': candidate.email,
      'skype': candidate.skype,
      'linkedIn': candidate.linkedIn,
      'phone': candidate.phone,
      'cvPath': candidate.cvPath,
    });
  }

  public vacancyTechnologiesChange(event) {
    const id = Number(event.target.value);

    const selectedTechnologies = this.candidatePageFrom.get('technologyIds').value;

    if (event.target.checked) {
      if (selectedTechnologies.indexOf(id) < 0) {
        selectedTechnologies.push(id);
      }
    } else {
      if (selectedTechnologies.indexOf(id) >= 0) {
        selectedTechnologies.splice(selectedTechnologies.indexOf(id), 1);
      }
    }

    this.candidatePageFrom.get('technologyIds').setValue(selectedTechnologies);

    this.candidatePageFrom.get('technologyIds').markAsDirty();
    this.candidatePageFrom.get('technologyIds').markAsTouched();

    this.candidatePageFrom.updateValueAndValidity();
  }

  public saveCandidateClick(event) {
    const formData = this.candidatePageFrom.value;

    if (!this.id) {
      formData['id'] = 0;

      this.candidatesDataService.createCandidate(formData).subscribe(
        data => {
          this.router.navigate(['../candidates']);
        },
        error => {
          if (error.status === 400) {
           // this.notificationService.notify(NotificationType.Error, 'createCandidateError');
          }
        });
    } else {
      this.candidatesDataService.updateCandidate(formData).subscribe(
        data => {
          this.router.navigate(['../candidates']);
        },
        error => {
          if (error.status === 400) {
          //  this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
          }
        });
    }
  }

  public cancelClick(event) {
    this.router.navigate(['../candidates']);
    this.vacancies = [];
  }

  // public showModal(event) {
  //   this.setStageModalVisible = true;
  //   const formData = this.candidatePageFrom.value;
  //   this.vacancies = [];

  //   Observable.forkJoin(
  //     this.candidatesDataService.getByCandidate(this.id),
  //     this.candidatesDataService.getVacancyByTechnologyAndExperience(this.experienceId, this.technologyIds))
  //     .subscribe(
  //       data => {
  //         this.vacanciesOfCadidate = data[0];
  //         this.vacanciesForTheChoice = data[1];

  //         const idArray = this.vacanciesOfCadidate.filter(function (el, index, array) {
  //           return el.id;
  //         });

  //         for (let i = 0; i < this.vacanciesForTheChoice.length; i++) {
  //           if (!idArray.some(item => item.id === this.vacanciesForTheChoice[i].id)) {
  //             this.vacancies.push(this.vacanciesForTheChoice[i]);
  //           }
  //         }
  //       });

  //   this.candidatesDataService.updateCandidate(formData).subscribe(
  //     data => {
  //     },
  //     error => {
  //       if (error.status === 400) {
  //         this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
  //       }
  //     });
  // }

  // public attachToVacancyClick(event) {
  //   if (this.candidateAttachVacancyForm.valid) {
  //     const formData = this.candidateAttachVacancyForm.value;
  //     this.candidatesDataService.attachCandidateStageToVacancy({
  //       'candidateId': this.id,
  //       'vacancyId': Number(formData.vacancyId),
  //       'vacancyStage': Number(formData.vacancyStage)
  //     }).subscribe(
  //       data => {
  //         this.setStageModalVisible = false;
  //         this.refreshCurrentVacancyList();
  //       },
  //       error => {
  //         if (error.status === 400) {
  //           this.notificationService.notify(NotificationType.Error, 'attachCandidateStageToVacancyError');
  //         }
  //       });
  //   }
  // }

  // public deleteVacancyClick(event) {
  //   if (this.getSelectedVacancies()) {
  //     const arr = this.getSelectedVacancies();
  //     for (const item of arr) {
  //       this.candidatesDataService.detachVacancy(item).subscribe(
  //         data => {
  //           this.refreshCurrentVacancyList();
  //         });
  //     }
  //   }
  // }

  // public refreshCurrentVacancyList() {
  //   this.candidatesDataService.getByCandidate(this.id).subscribe(
  //     data => {
  //       this.candidateVacancyStage = data;
  //     },
  //     error => {
  //       if (error.status === 400) {
  //         this.notificationService.notify(NotificationType.Error, 'candidatesListLoadError');
  //       }
  //     });
  //   this.selectedVacanciesOfCandidate = [];
  //   this.vacancies = [];
  //   this.clearCandidateAttachVacancyForm();
  // }

  // private getSelectedVacancies() {
  //   let selectedCandidateList: any[] = [];
  //   for (const item of this.selectedVacanciesOfCandidate) {
  //     selectedCandidateList = selectedCandidateList.concat({
  //       'vacancyId': item.id,
  //       'candidateId': this.id,
  //       'vacancyStage': item.vacancyStage
  //     });
  //   }
  //   return selectedCandidateList;
  // }

  // clearCandidateAttachVacancyForm() {
  //   this.candidateAttachVacancyForm.get('vacancyId').setValue(null);
  //   this.candidateAttachVacancyForm.get('vacancyStage').setValue(null);
  // }
}

import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OwlDateTimeIntl } from 'ng-pick-datetime';
import { NativeDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/native-date-time-adapter.class';
import { IndexDataService } from './../../../../services/index-data.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { stringify } from '@angular/core/src/render3/util';
import { SendedEmail } from './sended-email';
import { DatePipe } from '@angular/common';
import { ModalService } from '../notifications/services/modal.service';


@Component({
  selector: 'm-app-appointment-section',
  templateUrl: './appointment-section.component.html',
  styleUrls: [
    './../../../../css/bootstrap.css',
    './../../../../plugins/revolution/css/settings.css',
    './../../../../plugins/revolution/css/layers.css',
    './../../../../plugins/revolution/css/navigation.css',
    './../../../../css/style.css',
    './../../../../css/responsive.css',
    './../../../../css/color-switcher-design.css',
    './../../../../css/color-themes/default-theme.css',
    './appointment-section.component.css',
  ],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'ua' },
    { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE, Platform] },
    IndexDataService
  ],
})
export class AppointmentSectionComponent implements OnInit {
  sendFormDate: FormGroup;
  sendedEmail: SendedEmail = new SendedEmail();
  private bodyText: string;
  submitted = false;

  today = new Date().toJSON().split('T')[0];
  EndDate = this.addMonths(new Date(), 2);
  curentTime = "10:00";
  curentDatee = "10:00";

  constructor(private indexdDataService: IndexDataService, private http: HttpClient, private router: Router,
    private modalService: ModalService) {
    this.sendFormDate = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'userEmail': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')]),
      'userPhone': new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      'userServices': new FormControl('', Validators.required),
      'userBreed': new FormControl('', Validators.required),
      'userDate': new FormControl(),
      'userPeriod1': new FormControl('', Validators.required),
      'userPeriod2': new FormControl(''),
      'userMessage': new FormControl('', Validators.required),
    });
    this.bodyText = 'This text can be updated in modal 1';

  }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.sendFormDate.controls; }

  public myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;    // Prevent Saturday and Sunday from being selected.
  }

  isLeapYear(year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
  }

  getDaysInMonth(year, month) {
    return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }

  addMonths(date, value) {
    var d = new Date(date),
      n = date.getDate();
    d.setDate(1);
    d.setMonth(d.getMonth() + value);
    d.setDate(Math.min(n, this.getDaysInMonth(d.getFullYear(), d.getMonth())));
    return d;
  }


  // public clearForm(event) {
  //   this.sendedEmail.name = '';
  //   this.sendedEmail.email = '';
  //   this.sendedEmail.phone = '';
  //   this.sendedEmail.services = '';
  //   this.sendedEmail.breed = '';
  //   this.sendedEmail.date = '';
  //   this.sendedEmail.startTime = '';
  //   this.sendedEmail.endTime = '';
  //   this.sendedEmail.message = '';
  // }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.sendFormDate.invalid) {
      return;
    }
    this.indexdDataService.sendDataForm(this.sendedEmail).subscribe(
      (data: SendedEmail) => { },

    //   // error => {
    //   // 	if (error.status === 400) {
    //   // 		alert('createVacancyError');
    //   // 	}Event
     );
    this.openModal('custom-modal-2');
    // this.clearForm(event);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}

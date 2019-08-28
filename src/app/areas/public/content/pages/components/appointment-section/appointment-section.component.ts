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
import { EnumNames } from '../../../../../constants/enum-names';
import { PageBuilderDataService } from '../../../../../control-panel/content/pages/pages-builder/services/pages-builder.services';
// import { UserDataService } from '../../../../../control-panel/content/pages/users/services/users.services';
import { UserModel } from '../../../../../control-panel/content/pages/users/edit-page/user';


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
  public sendFormDate: FormGroup;
  public sendedEmail: SendedEmail = new SendedEmail();
  private bodyText: string;
  public submitted = false;
  public EnumNames = EnumNames;
  public listMagicPages = [];
  public user: UserModel = new UserModel();


  today = new Date().toJSON().split('T')[0];
  EndDate = this.addMonths(new Date(), 2);
  curentTime = "10:00";
  curentDatee = "10:00";

  constructor(private indexdDataService: IndexDataService,
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService,
    private pageBuilderDataService: PageBuilderDataService,
    // private userDataService: UserDataService,

  ) {
    this.sendFormDate = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'userEmail': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')]),
      'userPhone': new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      'userServices': new FormControl(''),
      'userBreed': new FormControl(''),
      'userDate': new FormControl(),
      'userPeriod1': new FormControl(''),
      'userPeriod2': new FormControl(''),
      'userMessage': new FormControl(''),
    });
    this.bodyText = 'This text can be updated in modal 1';

  }

  ngOnInit() {
    this.pageBuilderDataService.getSections().subscribe(
      data => {
        this.listMagicPages = data.result;
      });
  }

  public getMagicPageForType(magicPageType) {
    return this.listMagicPages.filter(item => item.Type === magicPageType)[0];
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
    if (!this.sendedEmail.breed) {
      this.sendedEmail.breed = '-';
    }
    if (!this.sendedEmail.date) {
      this.sendedEmail.date = '01/01/2019 10:00:00 PM';
    }
    if (!this.sendedEmail.endTime) {
      this.sendedEmail.endTime = '-';
    }
    if (!this.sendedEmail.startTime) {
      this.sendedEmail.startTime = '-';
    }
    if (!this.sendedEmail.services) {
      this.sendedEmail.services = '-';
    }
    if (!this.sendedEmail.message) {
      this.sendedEmail.message = '-';
    }
    
    this.indexdDataService.sendDataForm(this.sendedEmail).subscribe(
      (data: SendedEmail) => { },
    );
    this.openModal('custom-modal-2');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}

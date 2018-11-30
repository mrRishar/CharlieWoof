import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { ContactUs } from './contactUs';
import { IndexDataService } from './../../../../services/index-data.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ModalService } from '../notifications/services/modal.service';

@Component({
  selector: 'm-app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: [
    './../../../../css/bootstrap.css',
    './../../../../plugins/revolution/css/settings.css',
    './../../../../plugins/revolution/css/layers.css',
    './../../../../plugins/revolution/css/navigation.css',
    './../../../../css/style.css',
    './../../../../css/responsive.css',
    './../../../../css/color-switcher-design.css',
    './../../../../css/color-themes/default-theme.css',
    '../appointment-section/appointment-section.component.css',
  ]
})
export class ContactSectionComponent implements OnInit {
  lat: number = 49.833262;
  lng: number = 24.008168;
  contactUs: ContactUs = new ContactUs();
  constructor(private indexdDataService: IndexDataService,
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit() {
  }

  public clearForm(event) {
    this.contactUs.email = '';
    this.contactUs.subject = '';
    this.contactUs.message = '';
  }
  contactForm() {
    this.indexdDataService.sendContactForm(this.contactUs).subscribe(
      (data: ContactUs) => { },
    );
    this.clearForm(event);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}

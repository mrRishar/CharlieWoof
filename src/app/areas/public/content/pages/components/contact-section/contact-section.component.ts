import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { ContactUs } from './contactUs';
import { IndexDataService } from './../../../../services/index-data.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ModalService } from '../notifications/services/modal.service';
import { PageBuilderDataService } from '../../../../../control-panel/content/pages/pages-builder/services/pages-builder.services';
import { EnumNames } from '../../../../../constants/enum-names';

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
  sendFormDate: FormGroup;
  contactUs: ContactUs = new ContactUs();
  submitted = false;
  public EnumNames = EnumNames;
  public listMagicPages = [];
  public Content = '';
	public Title = '';
	public SeoTitle = '';
	public SeoDescription = '';
  public SeoKeywords = '';
	public Description  = '';

  constructor(private indexdDataService: IndexDataService,
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService,
    private pageBuilderDataService: PageBuilderDataService
  ) {
    this.sendFormDate = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'userEmail': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')]),
      'message': new FormControl('', [Validators.required, Validators.pattern('')]),
    });
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

  public clearForm(event) {
    this.contactUs.email = '';
    this.contactUs.subject = '';
    this.contactUs.message = '';
  }
  contactForm() {
    this.submitted = true;
    if (!this.contactUs.message) {
      this.contactUs.message = '-';
    }
    this.indexdDataService.sendContactForm(this.contactUs).subscribe(
      (data: ContactUs) => { },
    );
     if (this.sendFormDate.valid) {
      this.openModal('custom-modal-1');

    }
    this.clearForm(event);
   

  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}

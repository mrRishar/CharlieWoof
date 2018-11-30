import { Component, OnInit } from '@angular/core';
import { IndexDataService } from './../../../../services/index-data.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ModalService } from '../notifications/services/modal.service';
import { AddToCourses } from './addToCourses';

@Component({
  selector: 'm-app-fluid-section',
  templateUrl: './fluid-section.component.html',
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
export class FluidSectionComponent implements OnInit {
  addToCourses: AddToCourses = new AddToCourses();
  sendFormDateCourses: FormGroup;

  submitted = false;

  constructor(private indexdDataService: IndexDataService,
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService) {
    this.sendFormDateCourses = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'userPhone': new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    });
  }

  ngOnInit() {
  }

  public clearForm(event) {
    this.addToCourses.name = '';
    this.addToCourses.phone = '';
  }
  contactForm() {
    this.submitted = true;
    this.indexdDataService.sendContactFormForCours(this.addToCourses).subscribe(
      (data: AddToCourses) => { },
    );
    this.clearForm(event);
    this.closeModal('custom-modal-3');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.clearForm(event);
    this.modalService.close(id);
  }

}

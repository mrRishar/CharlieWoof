import { Component, OnInit } from '@angular/core';
import { PageBuilderDataService } from '../../../../../control-panel/content/pages/pages-builder/services/pages-builder.services';
import { EnumNames } from '../../../../../constants/enum-names';

@Component({
  selector: 'm-app-services-section',
  templateUrl: './services-section.component.html',
  styleUrls: [
    './../../../../css/bootstrap.css',
    './../../../../plugins/revolution/css/settings.css',
    './../../../../plugins/revolution/css/layers.css',
    './../../../../plugins/revolution/css/navigation.css',
    './../../../../css/style.css',
    './../../../../css/responsive.css',
    './../../../../css/color-switcher-design.css',
    './../../../../css/color-themes/default-theme.css',
    './services-section.component.css',
  ]
})
export class ServicesSectionComponent implements OnInit {
  public EnumNames = EnumNames;
  public listMagicPages = []; 

  constructor(
    private pageBuilderDataService: PageBuilderDataService,
  ) { }

  ngOnInit() {
    this.pageBuilderDataService.getSectionsWithContentItems().subscribe(
      data => {
        this.listMagicPages = data.result;
      });
  }

  public getMagicPageForType(magicPageType) {
    return this.listMagicPages.filter(item => item.Type === magicPageType)[0];
  }

  getContentItems(magicPageType) {
    const contItems = this.listMagicPages.filter(item => item.Type === magicPageType)[0].MagicContentItems;
    return contItems;
  }
}

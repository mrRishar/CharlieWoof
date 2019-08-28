import { Component, OnInit } from '@angular/core';
import { PageBuilderDataService } from '../../../../../control-panel/content/pages/pages-builder/services/pages-builder.services';
import { EnumNames } from '../../../../../constants/enum-names';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'm-app-welcome-section',
  templateUrl: './welcome-section.component.html',
  styleUrls: [
    './../../../../css/bootstrap.css',
    './../../../../plugins/revolution/css/settings.css',
    './../../../../plugins/revolution/css/layers.css',
    './../../../../plugins/revolution/css/navigation.css',
    './../../../../css/style.css',
    './../../../../css/responsive.css',
    './../../../../css/color-switcher-design.css',
    './../../../../css/color-themes/default-theme.css',
    './welcome-section.component.css',
  ]
})
export class WelcomeSectionComponent implements OnInit {

  public EnumNames = EnumNames;
  public listMagicPages = [];
  urlSafe: SafeResourceUrl;
  
  constructor(
    public sanitizer: DomSanitizer,
    private pageBuilderDataService: PageBuilderDataService
  ) { }

  ngOnInit() {
    this.pageBuilderDataService.getSectionsWithContentItems().subscribe(
      data => {
        this.listMagicPages = data.result;
      });
  }

  public getVideoUrl(magicPageType) {
    const url = this.listMagicPages.filter(item => item.Type === magicPageType)[0].SeoTitle;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return this.urlSafe;
  }

  public getMagicPageForType(magicPageType) {
    return this.listMagicPages.filter(item => item.Type === magicPageType)[0];
  }
}

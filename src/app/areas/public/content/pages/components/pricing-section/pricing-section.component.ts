import { Component, OnInit } from '@angular/core';
import { DataService } from './pricing-section.service';
import { Model } from './pricing-section.model';
import { TrimingService } from './triming/triming.service';
import { Triming } from './triming/pricing-section.triming';
import { CatsService } from './cats/cats.service';
import { Cats } from './cats/pricing-section.cats';
import { PlassService } from './plass/plass.service';
import { Plass } from './plass/pricing-section.plass';
import { EnumNames } from './../../../../../constants/enum-names';
import { PageBuilderDataService } from '../../../../../control-panel/content/pages/pages-builder/services/pages-builder.services';


@Component({
  selector: 'm-app-pricing-section',
  templateUrl: './pricing-section.component.html',
  styleUrls: [
    './../../../../css/bootstrap.css',
    './../../../../plugins/revolution/css/settings.css',
    './../../../../plugins/revolution/css/layers.css',
    './../../../../plugins/revolution/css/navigation.css',
    './../../../../css/style.css',
    './../../../../css/responsive.css',
    './../../../../css/color-switcher-design.css',
    './../../../../css/color-themes/default-theme.css',
    './pricing-section.component.css'
  ],

  providers: [
    DataService,
    TrimingService,
    CatsService,
    PlassService,
  ]
})
export class PricingSectionComponent implements OnInit {

  items: Model[] = [];
  trimingitems: Triming[] = [];
  catitems: Cats[] = [];
  plassitems: Plass[] = [];

  public EnumNames = EnumNames;
  public listMagicPages = [];
  public Content = '';
  public Title = '';
  public SeoTitle = '';
  public SeoDescription = '';
  public SeoKeywords = '';
  public Description = '';
  constructor(
    private dataService: DataService,
    private trimingService: TrimingService,
    private catsService: CatsService,
    private plassService: PlassService,
    private pageBuilderDataService: PageBuilderDataService,
  ) {
  }
  addItem(name: string, price: number, pricesecond: number) {

    this.dataService.addData(name, price, pricesecond);
    this.trimingService.addData(name, price, pricesecond);
    this.catsService.addData(name, price, pricesecond);
    this.plassService.addData(name, price, pricesecond);


  }
  ngOnInit() {
    this.items = this.dataService.getData();
    this.trimingitems = this.trimingService.getData();
    this.catitems = this.catsService.getData();
    this.plassitems = this.plassService.getData();

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
    return contItems.sort((a, b) => a.sortNumber < b.sortNumber);
  }
}

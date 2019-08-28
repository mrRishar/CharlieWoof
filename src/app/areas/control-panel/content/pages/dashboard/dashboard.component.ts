import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as objectPath from 'object-path';
import { LayoutConfigService } from '../../../../../core/services/layout-config.service';
import { SubheaderService } from '../../../../../core/services/layout/subheader.service';


@Component({
  selector: 'm-app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
  // styleUrls: ['./index.component.scss']
})
export class DashboardComponent implements OnInit {

  public config: any;

  constructor(
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    private subheaderService: SubheaderService
  ) {
  }

  ngOnInit(): void { }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Inject, Input, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { AppDataService } from 'src/app/shared/services/app-data.service';
import { environment } from 'src/environments/environment';
import ArrayStore from 'devextreme/data/array_store';

@Component({
  templateUrl: 'order-bookDetail.component.html',
  selector: 'order-book-detail-grid',
})

export class OrderBookDetailComponent {
  @Input() data: any;
  pmiDataSource: DataSource;
  gridDataSource: any = {};
  _httpClient: HttpClient;

  constructor(public appData: AppDataService, @Inject(HttpClient) httpClient: HttpClient) {
    this._httpClient = httpClient;

  }
  ngAfterViewInit() {
    this.gridDataSource = this.data;

  }

 

  completedValue(rowData) {
    return rowData.Status == "Completed";
  }

}

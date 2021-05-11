import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { AppInfoService } from 'src/app/shared/services';
import { AppDataService } from 'src/app/shared/services/app-data.service';
import { IApiLookupNameDto } from 'src/app/shared/services/model/IApiLookupNameDto';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: 'order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})

export class OrderBookComponent {
  dataSource: any;
  status: any;
  exceptStatus: string;
  statusData: IApiLookupNameDto[];
  gridDataSource: any = {};
  @ViewChild('dataGridVar', { static: false }) dataGrid: DxDataGridComponent;

  constructor(public appData: AppDataService, @Inject(HttpClient) httpClient: HttpClient, public appInfoData: AppInfoService) {

    appInfoData.loadExceptStatusLookupData('')
    .toPromise()
          .then((result: any) => {
            this.statusData = result;
          });


    this.gridDataSource = new DataSource({
      key: "id",
      load: (loadOptions) => {
        let params: HttpParams = new HttpParams();
        [
          "skip",
          "take",
          "count"
        ].forEach(function (i) {
          if (i in loadOptions && isNotEmpty(loadOptions[i]))
            if (i === 'skip') {
              params = params.set('offset', JSON.stringify(loadOptions[i]));
            }
            else {
              params = params.set(i, JSON.stringify(loadOptions[i]));
            }
        });
        params = params.set("count", this.gridDataSource._pageSize);
        
        params = this.setCustomParameters(params);
        return httpClient.get(arbitaOrderBookInfoUrl(), { params: params })
          .toPromise()
          .then((result: any) => {
            return {
              data: result.items,
              totalCount: result.total,
              summary: result.total,
              groupCount: result.total
            };
          });
      }
    });

    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== "";
    }

    function arbitaOrderBookInfoUrl() {
      return environment.apiUrl2 + `/api/v1/orderbook-distributor`;
    }
  }

  setCustomParameters(params){

    if (!!this.status || this.status === 0) {
      params = params.set("status", this.status);
    }
    if (!!this.exceptStatus) {
      params = params.set("exceptStatus", this.exceptStatus);
    }
    return params;
  }

  gridRefresh() {
    this.dataGrid.instance.refresh();
  }
  customizeColumns (columns) {
    columns[1].visible = false;
}

}

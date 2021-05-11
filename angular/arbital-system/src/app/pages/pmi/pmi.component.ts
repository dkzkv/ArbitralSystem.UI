import { HttpClient, HttpParams } from '@angular/common/http';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Inject, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { Observable } from 'rxjs';
import { AppInfoService } from 'src/app/shared/services';
import { AppDataService } from 'src/app/shared/services/app-data.service';
import { IApiLookupNameDto } from 'src/app/shared/services/model/IApiLookupNameDto';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: 'pmi.component.html',
  styleUrls: ['./pmi.component.scss']
})

export class PmiComponent {
  dataSource: any;
  baseCurrency: string;
  quoteCurrency: string;
  occurencesCount: string;
  exchange: IApiLookupNameDto;
  exchangeData: IApiLookupNameDto[];
  exchangeGrid: string;
  gridDataSource: any = {};
  @ViewChild('dataGridVar', { static: false }) dataGrid: DxDataGridComponent;
  @ViewChild('dataExchangeGridVar', { static: false }) dataExchangeGrid: DxDataGridComponent;

  constructor(public appData: AppDataService, @Inject(HttpClient) httpClient: HttpClient, public appInfoData: AppInfoService) {
    
  appInfoData.loadExchangeLookupData('')
    .toPromise()
          .then((result: any) => {
            this.exchangeData = result;
          });

    this.gridDataSource = new DataSource({
      key: "unificatedPairName",
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
        return httpClient.get(arbitaPairInfolUrl(), { params: params })
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

    function arbitaPairInfolUrl() {
      return environment.apiUrl + `/api/v1/pair-info/unique`;
    }
    function arbitaPairInfoExchangelUrl(exchange) {
      if (exchange) {
        return environment.apiUrl + `/api/v1/pair-info/${exchange}`;
      }
      return environment.apiUrl + `/api/v1/pair-info`;
    }
  }

  setCustomParameters(params){

    if (!!this.baseCurrency) {
      params = params.set("baseCurrency", this.baseCurrency);
    }
    if (!!this.occurencesCount) {
      params = params.set("occurencesCount", this.occurencesCount);
    }
    if (!!this.quoteCurrency) {
      params = params.set("quoteCurrency", this.quoteCurrency);
    }
    if (!!this.exchange) {
      params = params.set("exchange", this.exchange);
    }
    return params;
  }

  gridRefresh() {
    this.dataGrid.instance.refresh();
  }

  gridExchangeRefresh() {
    this.dataExchangeGrid.instance.refresh();
  }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Inject, Input, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { AppDataService } from 'src/app/shared/services/app-data.service';
import { environment } from 'src/environments/environment';
import ArrayStore from 'devextreme/data/array_store';

@Component({
  templateUrl: 'pmiDetail.component.html',
  selector: 'pmi-detail-grid',
})

export class PmiDetailComponent {
  @Input() key: any;
  pmiDataSource: DataSource;
  gridDataSource: any = {};
  _httpClient: HttpClient;
  

  constructor(public appData: AppDataService, @Inject(HttpClient) httpClient: HttpClient) {
    this._httpClient = httpClient;

  }


  ngAfterViewInit() {
    this.gridDataSource = new DataSource({
      key: "exchangePairName",
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
        params = params.set("count", "10");

        return this._httpClient.get(this.arbitaPairInfolUrl(), { params: params })
          .toPromise()
          .then((result: any) => {
            return {
              data: result.details,
              totalCount: result.details.length,
              summary: result.details.length,
              groupCount: result.details.length
            };
          });
      }
    });

  

    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== "";
    }

  }

 arbitaPairInfolUrl() {
    let repKey = this.key.replace('/', '-');
    return environment.apiUrl + `/api/v1/pair-info/detailed/${repKey}`;
  }

  completedValue(rowData) {
    return rowData.Status == "Completed";
  }

}

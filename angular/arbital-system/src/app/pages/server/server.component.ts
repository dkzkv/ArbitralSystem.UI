import { HttpClient, HttpParams } from '@angular/common/http';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Inject, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { AppInfoService } from 'src/app/shared/services';
import { AppDataService } from 'src/app/shared/services/app-data.service';
import { IApiLookupNameDto } from 'src/app/shared/services/model/IApiLookupNameDto';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: 'server.component.html',
  styleUrls: ['./server.component.scss']
})

export class ServerInfoComponent {
  dataSource: any;
  typeServer: any;
  typeData: IApiLookupNameDto[];
  isDeleted: Boolean = false;
  gridDataSource: any = {};
  @ViewChild('dataGridVar', { static: false }) dataGrid: DxDataGridComponent;

  constructor(public appData: AppDataService, @Inject(HttpClient) httpClient: HttpClient, public appInfoData: AppInfoService) {

    appInfoData.loadTypeLookupData('')
      .toPromise()
      .then((result: any) => {
        this.typeData = result;
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
        params = params.set("isDeleted", this.isDeleted.toString());
        if (!!this.typeServer) {
          params = params.set("type", this.typeServer?.toString());
        }
        params = this.setCustomParameters(params);
        return httpClient.get(arbitaServerInfolUrl(), { params: params })
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

    function arbitaServerInfolUrl() {
      return environment.apiUrl2 + `/api/v1/server`;
    }

  }


  setCustomParameters(params) {

    if (!!this.typeServer) {
      params = params.set("type", this.typeServer);
    }

    return params;
  }

  gridRefresh() {
    this.dataGrid.instance.refresh();
  }

}

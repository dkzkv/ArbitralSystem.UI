import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponseCommonDto } from 'src/app/infrastruct/IApiResponseCommonDto';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppDataService {
  constructor(private _http: HttpClient) {}

 private arbitaPairInfolUrl(params) {
    return environment.apiUrl + `/api/v1/pair-info/unique${params}`;
 }

 loadPmiDataGrid(params): Observable<IApiResponseCommonDto<any>> {
      params = '?count=5';
      let result = this._http.get<IApiResponseCommonDto<any>>(`${this.arbitaPairInfolUrl(params)}`, {withCredentials: false });
      return result;
 }

}

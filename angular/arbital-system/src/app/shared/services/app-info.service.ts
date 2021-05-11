import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiLookupNameDto } from './model/IApiLookupNameDto';

@Injectable()
export class AppInfoService {
  constructor(private _http: HttpClient) { }

  public get title() {
    return 'Arbital System';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }

  private arbitaExchnageInfolUrl(params) {
    return environment.apiUrl + `/api/v1/exchange${params}`;
  }
  private arbitaTypeInfolUrl(params) {
    return environment.apiUrl2 + `/api/v1/server/types${params}`;
  }

  private arbitaExceptStatusInfolUrl(params) {
    return environment.apiUrl2 + `/api/v1/server/statuses${params}`;
  }

  loadExchangeLookupData(params): Observable<IApiLookupNameDto[]> {
    params = '';
    let result = this._http.get<IApiLookupNameDto[]>(`${this.arbitaExchnageInfolUrl(params)}`, { withCredentials: false });
    return result;
  }

  loadTypeLookupData(params): Observable<IApiLookupNameDto[]> {
    params = '';
    let result = this._http.get<IApiLookupNameDto[]>(`${this.arbitaTypeInfolUrl(params)}`, { withCredentials: false });
    return result;
  }

  loadExceptStatusLookupData(params): Observable<IApiLookupNameDto[]> {
    params = '';
    let result = this._http.get<IApiLookupNameDto[]>(`${this.arbitaExceptStatusInfolUrl(params)}`, { withCredentials: false });
    return result;
  }

}

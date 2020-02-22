import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const APP_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  getEmployee(){
    return this._http.get(`${APP_URL}/employee`)
  }
  saveEmployee(obj){
    return this._http.put(`${APP_URL}/employee`, obj)
    //return this._http.post(`${APP_URL}/employee`, obj)
  }
  getCountry(){
    return this._http.get(`${APP_URL}/country`)
  }
  getState(){
    return this._http.get(`${APP_URL}/state`)
  }
  getCity(){
    return this._http.get(`${APP_URL}/city`)
  }
}

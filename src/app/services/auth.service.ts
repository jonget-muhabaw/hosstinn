import { inject, Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { apiUrls } from '../core/constants/api.urls';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  loginService(loginObj: any){
    return this.http.post<any>(`${apiUrls.baseUR}login/`, loginObj);
  }
  constructor() { 
    
  }
  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn():boolean{
    return !localStorage.getItem('token');
  }
}


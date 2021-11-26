import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) {}

  login(usuario: any){
    console.info(JSON.stringify(usuario))

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    // headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // headers = headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
    // headers = headers.append('zumo-api-version', '2.0.0');

    console.log({headers});

    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario), {headers}).subscribe(data => {
      // Retorno Http
      console.info(JSON.parse(JSON.stringify(data)));
    })

  }

}

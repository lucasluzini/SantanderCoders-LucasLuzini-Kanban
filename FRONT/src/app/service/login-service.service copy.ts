import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { request } from 'http';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) {}

  login(usuario: any){

    // const Url = 'http://0.0.0.0:5000/login/';
    // const headerDict = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    // }
    
    // const requestOptions = {                                                                                                                                                                                 
    //   headers: new Headers(headerDict), 
    // };

    // console.log(requestOptions)


    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('authentication', `${student.token}`);
    // let options = new RequestOptions({ headers: headers });
    // return this.http
    //      .put(url, JSON.stringify(student), options)
   
    console.info(JSON.stringify(usuario))

    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {
      // Retorno Http
      console.info(JSON.parse(JSON.stringify(data)));
    })


    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };
    console.log(requestOptions);

    
  }

}

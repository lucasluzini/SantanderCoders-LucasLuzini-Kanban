// by Lucas Luzini

import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Observable, Subject } from 'rxjs';
import { Card } from 'src/app/models/card.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  cards!: Card[];
  authorization: string = localStorage.getItem('token') || '';

  headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    Authorization: this.authorization,
  };

  isLogged = new Subject();

  constructor(private httpRequest: HttpClient) {}

  loginRequestGetToken(requestLogin: any){
    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5000/');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers = headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    const response = this.httpRequest.post<string>(AppConstants.baseLogin, JSON.stringify(requestLogin), {headers: headers});
    return response;
  }

  setToken(token: string) {
    this.authorization = 'Bearer ' + token;
    localStorage.setItem('token', this.authorization);
    this.isLogged.next(true);
  }

  clearToken() {
    this.authorization = '';
    localStorage.removeItem('token');
    this.isLogged.next(true);
  }

  getCards() {
    const response = this.httpRequest.get<Card[]>(AppConstants.baseCards, { headers: this.headers });
    return response;
  }

  cardsChanged = new Subject();
}

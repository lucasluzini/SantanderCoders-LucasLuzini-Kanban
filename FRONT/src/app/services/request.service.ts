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

  loginValid = new Subject();

  constructor(private varHttpClient: HttpClient) {}

  loginRequestGetToken(bodyLoginEsenha: any){
    const response = this.varHttpClient.post<string>(AppConstants.baseLogin, JSON.stringify(bodyLoginEsenha), {headers: this.headers});
    return response;
  }

  setToken(token: string) {
    this.authorization = 'Bearer ' + token;
    localStorage.setItem('token', this.authorization);
    this.loginValid.next(true);
  }

  clearToken() {
    this.authorization = '';
    localStorage.removeItem('token');
    this.loginValid.next(true);
  }

  getCards() {
    const response = this.varHttpClient.get<Card[]>(AppConstants.baseCards, { headers: this.headers });
    return response;
  }
}

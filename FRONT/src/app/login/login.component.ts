import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { LoginServiceService } from '../service/login-service.service';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginServiceService){}

  ngOnInit(): void {
  }

  usuario = {login: 'letscode', senha: 'lets@123'};
  // usuario = {login: '', senha: ''};
  
  public login() {
    console.log("Teste login -- usuario: " + this.usuario.login + " senha: " + this.usuario.senha);
    this.loginService.login(this.usuario);
  }

}

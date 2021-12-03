// by Lucas Luzini

import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../services/request.service';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  bodyLoginEsenha = {login: 'letscode', senha: 'lets@123'};
  // bodyLoginEsenha = {login: '', senha: ''};
  validLogin: boolean = false;

  constructor(private varRequestService: RequestService, private router: Router){}

  ngOnInit(): void { 

  }

  public onSubmit(): void {
    this.login();
  }

  public login(): void {
    this.varRequestService.loginRequestGetToken(this.bodyLoginEsenha).subscribe((token) => {
        if (token) {
          this.varRequestService.setToken(token);
          this.router.navigateByUrl('/kanban-board');
          this.validLogin = false;
        } else {
          this.validLogin = true;
          this.varRequestService.clearToken();
        }
      });
  }

  public isAuthenticated(): boolean {
    return Boolean(localStorage.getItem("token"))
  }

}

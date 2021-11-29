import { Component } from '@angular/core';
import { LoginServiceService } from './service/login-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SantanderCoders-LucasLuzini-Kanban';

  usuario = {login: 'letscode', senha: 'lets@123'};
  // usuario = {login: '', senha: ''};

  constructor(private loginService: LoginServiceService){}

  public login() {
    console.log("Teste login -- usuario: " + this.usuario.login + " senha: " + this.usuario.senha);
    this.loginService.login(this.usuario);
  }

  ngOnInit() {
    // this.login();
  }

}

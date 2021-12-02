import { Injectable } from '@angular/core';
import { RequestService } from '../services/request.service';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private varRequestService: RequestService) { }

  cards!: Card[];

  createCard(titulo: string, conteudo: string, lista: string) {
    // console.log(titulo, conteudo, lista);
    this.varRequestService.insertCard(titulo, conteudo, lista).subscribe();
  }

  readCards() {
    this.varRequestService.getCards().subscribe((data) => {
      if (!data) {
        console.log("readCards() não funcionou");
        return;
      } else {
        console.log(data);
        return data;
      }
    });
  }


}

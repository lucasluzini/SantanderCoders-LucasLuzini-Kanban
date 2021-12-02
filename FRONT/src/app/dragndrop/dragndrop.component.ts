// by Lucas Luzini

import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from '../models/card.model';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css']
})
export class DragndropComponent implements OnInit {

  constructor(private varRequestService: RequestService) { }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  doing = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk Dog'];
  done = ['Get', 'Brush', 'Take', 'Check', 'Walk'];
  
  //CRUD

  createCard(titulo: string, conteudo: string, lista: string) {
    // console.log(titulo, conteudo, lista);
    this.varRequestService.insertCard(titulo, conteudo, lista).subscribe();
  }

  cardsArray!: Card[];
  readCards() {
    this.varRequestService.getCards().subscribe((data) => {
      if (!data) {
        console.log("readCards() não funcionou");
        return;
      } else {
        this.cardsArray = data;
        console.log(this.cardsArray);
        this.collumnCreator();
      }
    });
    
  }


  collumnCreator(){
    var todoList = this.cardsArray.filter(function(e) {
      return e.lista == 'todo';
    });
    console.log(todoList);
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  ngOnInit(): void {
    // this.createCard("Titulo1", "Conteudo1", "todo");
    // this.createCard("Titulo2", "Conteudo2", "doing");
    // this.createCard("Titulo3", "Conteudo3", "done");
    this.readCards();
  }
}

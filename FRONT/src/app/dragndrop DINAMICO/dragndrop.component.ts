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

  constructor(private varRequestService: RequestService) {
    for (let week of this.weeks) {
      this.connectedTo.push(week.id);
    };
    // this.readCards();
    console.log(this.connectedTo);
  };

  ngOnInit(){}

  
  todoArray!: Card[];
  doingArray!: Card[];
  doneArray!: Card[];
  

  connectedTo : string[] = [];
  // connectedTo = ['ToDo', 'Doing', 'Done'];

  weeks = [
    {
      id:'week-1',
      weeklist:[
        "item 1",
        "item 2",
        "item 3",
        "item 4",
        "item 5"
      ]
    },{
      id:'week-2',
      weeklist:[
        "item 1",
        "item 2",
        "item 3",
        "item 4",
        "item 5"
      ]
    },{
      id:'week-3',
      weeklist:[
        "item 1",
        "item 2",
        "item 3",
        "item 4",
        "item 5"
      ]
    },{
      id:'week-4',
      weeklist:[
        "item 1",
        "item 2",
        "item 3",
        "item 4",
        "item 5"
      ]
    },
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }




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
      for (let item of this.cardsArray) {
        this.connectedTo.push(item.lista);
      };
      console.log(this.connectedTo);
      // var todoList = this.cardsArray.filter(function(e) {
      //   return e.lista == 'todo';
      // });
      // console.log(todoList);
      // this.todoArray =  todoList;
  
      // var doingList = this.cardsArray.filter(function(e) {
      //   return e.lista == 'doing';
      // });
      // console.log(doingList);
      // this.doingArray =  doingList;
  
      // var doneList = this.cardsArray.filter(function(e) {
      //   return e.lista == 'done';
      // });
      // console.log(doneList);
      // this.doneArray =  doneList;
    }
}

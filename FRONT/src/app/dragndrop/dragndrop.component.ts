// by Lucas Luzini

import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { RequestService } from '../services/request.service';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css']
})
export class DragndropComponent implements OnInit {

  constructor(private varRequestService: RequestService) { }

  // ngOnInit(): void {

  // }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  doing = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk Dog'];

  done = ['Get', 'Brush', 'Take', 'Check', 'Walk'];

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


  //new

  cards!: Card[];

  ngOnInit(): void {
    this.getAllCardsFromAPI();
 }

 getAllCardsFromAPI() {
   this.varRequestService.getCards().subscribe((cards) => {
     if (!cards) {
       console.log("getAllCardsFromAPI não funcionou");
       return;
     } else {
       this.cards = cards;
       console.log(cards);
     }
   });
 }

}

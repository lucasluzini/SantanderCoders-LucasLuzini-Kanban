// by Lucas Luzini

import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { RequestService } from '../services/request.service';
import { Card } from '../models/card.model';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css']
})
export class DragndropComponent implements OnInit {

  constructor(private varRequestService: RequestService, private varCrudService: CrudService) { }

  ngOnInit(): void {
    // this.varCrudService.createCard("Titulo1", "Conteudo1", "todo");
    // this.varCrudService.createCard("Titulo2", "Conteudo2", "doing");
    // this.varCrudService.createCard("Titulo3", "Conteudo3", "done");
    this.varCrudService.readCards();
 }

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
}

// by Lucas Luzini

import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from '../models/card.model';
import { RequestService } from '../services/request.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css']
})
export class DragndropComponent implements OnInit {

  // constructor(){}

  ngOnInit(){}

  weeks = [];
  // connectedTo = [];
  // connectedTo = [{weekID: ''}];
  // teste!: string[];

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
  
  constructor(){
    for (let week of this.weeks) {
      // this.connectedTo.push(week.id);
      // this.connectedTo.push({ weekID: week.id });
    };
  }

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
}

// by Lucas Luzini

import { APP_BOOTSTRAP_LISTENER, Component, NgModule, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from '../models/card.model';
import { RequestService } from '../services/request.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css']
})
export class DragndropComponent implements OnInit {

  constructor(private varRequestService: RequestService, private modalService: NgbModal) {
  }

  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  doing = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk Dog'];
  done = ['Get', 'Brush', 'Take', 'Check', 'Walk'];

  todoArray!: Card[];
  doingArray!: Card[];
  doneArray!: Card[];
  
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

  reload(){
    document.location.reload();
  }


  collumnCreator(){
    var todoList = this.cardsArray.filter(function(e) {
      return e.lista == 'todo';
    });
    console.log(todoList);
    this.todoArray =  todoList;

    var doingList = this.cardsArray.filter(function(e) {
      return e.lista == 'doing';
    });
    console.log(doingList);
    this.doingArray =  doingList;

    var doneList = this.cardsArray.filter(function(e) {
      return e.lista == 'done';
    });
    console.log(doneList);
    this.doneArray =  doneList;
  }


  drop(event: CdkDragDrop<Card[]>) {
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


  closeResult!: string;


  //Modal
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}

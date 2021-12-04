// by Lucas Luzini

import { APP_BOOTSTRAP_LISTENER, Component, NgModule, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from '../models/card.model';
import { RequestService } from '../services/request.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AfterViewInit,ElementRef, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-dragndrop',
  templateUrl: './dragndrop.component.html',
  styleUrls: ['./dragndrop.component.css']
})
export class DragndropComponent implements OnInit {

  constructor(private varRequestService: RequestService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.readCards();
  }

  reload(){
    document.location.reload();
  }
  
  todoArray!: Card[];
  doingArray!: Card[];
  doneArray!: Card[];
  
  cardsArray!: Card[];

  bodyCreateCard = {
    titulo: '',
    conteudo: '',
    lista: 'todo'
  };
  bodyEditCard = {
    id: '',
    titulo: '',
    conteudo: '',
    lista: ''
  };
  validCreation=false;
  creationsErrors='';


  collumnCreator(){
    var todoList = this.cardsArray.filter(function(e) {
      return e.lista == 'todo';
    });
    // console.log(todoList);
    this.todoArray =  todoList;

    var doingList = this.cardsArray.filter(function(e) {
      return e.lista == 'doing';
    });
    // console.log(doingList);
    this.doingArray =  doingList;

    var doneList = this.cardsArray.filter(function(e) {
      return e.lista == 'done';
    });
    // console.log(doneList);
    this.doneArray =  doneList;
  }



  //CRUD

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
        this.cardsArray = data;
        // console.log(this.cardsArray);
        this.collumnCreator();
      }
    });
  }


  updateCard(id: string, titulo: string, conteudo: string, lista: string) {
    // console.log(titulo, conteudo, lista);
    this.varRequestService.alterCard(id, titulo, conteudo, lista).subscribe();
  }

  setEditValues(item: any){
    // console.log(item);
    this.bodyEditCard.id=item.id;
    this.bodyEditCard.titulo=item.titulo;
    this.bodyEditCard.conteudo=item.conteudo;
    this.bodyEditCard.lista=item.lista;
  }

  deleteCard(item: any){
    this.varRequestService.removeCard(item.id).subscribe();
  }



  //Modal

  closeResult!: string;
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openModalEditor(content: any, item: any) {
    this.setEditValues(item);
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

  modalSave(){
    if(this.bodyCreateCard.titulo=='' || this.bodyCreateCard.conteudo==''){
      console.error("Dados vazios");
      this.creationsErrors='Dados vazio!'
      return;
    }
    else{
        // console.log(this.bodyCreateCard);
        this.createCard(this.bodyCreateCard.titulo, this.bodyCreateCard.conteudo, this.bodyCreateCard.lista);
        this.readCards();
        // console.log("Dados inseridos");
        this.bodyCreateCard.titulo='';
        this.bodyCreateCard.conteudo='';
    }
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

      // console.log(event.previousContainer.data);
      // console.log(event.container.data);
      // console.log(event.previousIndex);
      // console.log(event.currentIndex);
      // console.log(event.container.data[event.currentIndex].id, event.container.data[event.currentIndex].titulo)
      // console.log(event.previousIndex);
      // console.log(event.container.data[event.currentIndex].id, event.container.data[event.currentIndex].titulo, event.container.data[event.currentIndex].conteudo, event.container.id);

      //Atualiza o container
      this.updateCard(event.container.data[event.currentIndex].id, event.container.data[event.currentIndex].titulo, event.container.data[event.currentIndex].conteudo, event.container.id);
      // this.readCards();
    }
  }





}

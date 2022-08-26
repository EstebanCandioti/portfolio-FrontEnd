import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITecnologia } from 'src/app/interfaces/ITecnologia';

@Component({
  selector: 'app-item-tecnologias',
  templateUrl: './item-tecnologias.component.html',
  styleUrls: ['./item-tecnologias.component.css']
})
export class ItemTecnologiasComponent implements OnInit {
@Output() onEditTecnologia:EventEmitter<ITecnologia>=new EventEmitter
@Output() onDeleteTecnologia:EventEmitter<ITecnologia>=new EventEmitter
listaTecnologias:ITecnologia[] = [];
@Input() tecnologia:ITecnologia=this.listaTecnologias[0];
  constructor() { }

  ngOnInit(): void {
  }
  onDelete(tecnologia:ITecnologia){
    this.onDeleteTecnologia.emit(tecnologia);
  }
  onEdit(tecnologia:ITecnologia){
    this.onEditTecnologia.emit(tecnologia);
  }
}

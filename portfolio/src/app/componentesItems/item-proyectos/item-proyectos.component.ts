import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProyecto } from 'src/app/interfaces/IProyecto';

@Component({
  selector: 'app-item-proyectos',
  templateUrl: './item-proyectos.component.html',
  styleUrls: ['./item-proyectos.component.css']
})
export class ItemProyectosComponent implements OnInit {
@Output() onDeleteProyecto:EventEmitter<IProyecto>=new EventEmitter
@Output() onEditProyecto:EventEmitter<IProyecto>=new EventEmitter
listaProyectos:IProyecto[] = [];
@Input() proyecto:IProyecto = this.listaProyectos[0];
  constructor() { }

  ngOnInit(): void {
  }
  onDelete(proyecto:IProyecto){
    this.onDeleteProyecto.emit(proyecto)
  }
  onEdit(proyecto:IProyecto){
    this.onEditProyecto.emit(proyecto)
  }

}

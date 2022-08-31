import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { IEducacion } from 'src/app/interfaces/IEducacion';


@Component({
  selector: 'app-item-educacion',
  templateUrl: './item-educacion.component.html',
  styleUrls: ['./item-educacion.component.css']
})
export class ItemEducacionComponent implements OnInit {
  @Output() onEditEducacion:EventEmitter<IEducacion>=new EventEmitter
  @Output() onDeleteEducacion:EventEmitter<IEducacion>=new EventEmitter
  listaEducacion:IEducacion[]=[];
  @Input() educacion:IEducacion=this.listaEducacion[0];

  constructor() {
  }
  
  ngOnInit(): void {
  }

  onDelete(educacion:IEducacion) {
    this.onDeleteEducacion.emit(educacion)
  }
}

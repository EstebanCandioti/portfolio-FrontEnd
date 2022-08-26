import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHabilidad } from 'src/app/interfaces/IHabilidades';

@Component({
  selector: 'app-item-habilidad-fuerte',
  templateUrl: './item-habilidad-fuerte.component.html',
  styleUrls: ['./item-habilidad-fuerte.component.css']
})
export class ItemHabilidadFuerteComponent implements OnInit {

  @Output() onEditHabilidadFuerte:EventEmitter<IHabilidad>=new EventEmitter
  @Output() onDeleteHabilidadFuerte:EventEmitter<IHabilidad>=new EventEmitter
  habilidadLista:IHabilidad []=[];
  @Input() habilidad:IHabilidad =this.habilidadLista[0];
  constructor( ) {}

  ngOnInit(): void {
  }
  onDelete(habilidad:IHabilidad) {
    this.onDeleteHabilidadFuerte.emit(habilidad)
  }

  onEdit(educacion:IHabilidad){
    this.onEditHabilidadFuerte.emit(educacion)
  }
}

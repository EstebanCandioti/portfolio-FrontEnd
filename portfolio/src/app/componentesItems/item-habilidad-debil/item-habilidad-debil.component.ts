import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IHabilidad } from 'src/app/interfaces/IHabilidades';

@Component({
  selector: 'app-item-habilidad-debil',
  templateUrl: './item-habilidad-debil.component.html',
  styleUrls: ['./item-habilidad-debil.component.css']
})
export class ItemHabilidadDebilComponent implements OnInit {
  @Output() onEditHabilidadDebil:EventEmitter<IHabilidad> = new EventEmitter
  @Output() onDeleteHabilidadDebil:EventEmitter<IHabilidad>=new EventEmitter
  listaHabilidadesDebiles:IHabilidad[] = [];
  @Input() habilidad:IHabilidad = this.listaHabilidadesDebiles[0];
  constructor() { }

  ngOnInit(): void {
  }

  onEdit(habilidad:IHabilidad) {
    this.onEditHabilidadDebil.emit(habilidad);
  }
  onDelete(habilidad:IHabilidad) {
    this.onDeleteHabilidadDebil.emit(habilidad);
  }
}

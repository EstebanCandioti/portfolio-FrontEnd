import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IExperiencia } from 'src/app/interfaces/IExperiencia';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-item-experiencia',
  templateUrl: './item-experiencia.component.html',
  styleUrls: ['./item-experiencia.component.css']
})
export class ItemExperienciaComponent implements OnInit {
  @Output() onEditExperiencia:EventEmitter<IExperiencia>=new EventEmitter
  @Output() onDeleteExperiencia:EventEmitter<IExperiencia>=new EventEmitter
  experienciaList:IExperiencia []=[];
  @Input() experiencia:IExperiencia =this.experienciaList[0];
  constructor(private portfolioService:PortfolioService ) {}

  ngOnInit(): void {
  }
  onDelete(educacion:IExperiencia) {
    this.onDeleteExperiencia.emit(educacion)
  }

  onEdit(educacion:IExperiencia){
    this.onEditExperiencia.emit(educacion)
  }
}

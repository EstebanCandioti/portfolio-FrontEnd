import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-boton-borrar',
  templateUrl: './boton-borrar.component.html',
  styleUrls: ['./boton-borrar.component.css']
})
export class BotonBorrarComponent implements OnInit {
  @Output() btnClickBorrar = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onClickDelete(){
    this.btnClickBorrar.emit();
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITecnologia } from 'src/app/interfaces/ITecnologia';

@Component({
  selector: 'app-crear-tecnologia',
  templateUrl: './crear-tecnologia.component.html',
  styleUrls: ['./crear-tecnologia.component.css']
})
export class CrearTecnologiaComponent implements OnInit {
  @Output() onCrearTecnologia: EventEmitter<ITecnologia> = new EventEmitter();
  
  tecnologiaForm!:FormGroup
  constructor(private readonly fb:FormBuilder) { }

  ngOnInit(): void {
    this.tecnologiaForm=this.initForm();
  }
  onSubmit():void{
    console.log("En el modal")
    const nuevaTecnologia=this.tecnologiaForm.value;
    this.onCrearTecnologia.emit(nuevaTecnologia)
    this.tecnologiaForm.reset()
  }

  initForm():FormGroup{
    return this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      descripcion:['',[Validators.required,Validators.minLength(10), Validators.maxLength(200)]],
      tecnologiaImg:['']
    })
  }
}

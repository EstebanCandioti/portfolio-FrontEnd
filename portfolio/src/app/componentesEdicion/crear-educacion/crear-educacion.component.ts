import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEducacion } from 'src/app/interfaces/IEducacion';

@Component({
  selector: 'app-crear-educacion',
  templateUrl: './crear-educacion.component.html',
  styleUrls: ['./crear-educacion.component.css']
})
export class CrearEducacionComponent implements OnInit {
  @Output() onCrearEducacion: EventEmitter<IEducacion> = new EventEmitter();
  
  educacionForm!:FormGroup
  constructor(private readonly fb:FormBuilder) { }

  ngOnInit(): void {
    this.educacionForm=this.initForm();
  }
  onSubmit():void{
    console.log("En el modal")
    const nuevaEducacion=this.educacionForm.value;
    this.onCrearEducacion.emit(nuevaEducacion)
    this.educacionForm.reset()
  }

  initForm():FormGroup{
    return this.fb.group({
      institucion:['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      fotoInstitucion:['',[Validators.minLength(10), Validators.maxLength(100)]],
      titulo:['',[Validators.required,Validators.minLength(10), Validators.maxLength(40)]],
      inicioEducacion:['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      finalizacionEducacion:['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      id:[0]
    })
  }
}

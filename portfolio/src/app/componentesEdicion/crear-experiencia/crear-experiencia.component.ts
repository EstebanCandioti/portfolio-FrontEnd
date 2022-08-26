import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IExperiencia } from 'src/app/interfaces/IExperiencia';

@Component({
  selector: 'app-crear-experiencia',
  templateUrl: './crear-experiencia.component.html',
  styleUrls: ['./crear-experiencia.component.css']
})
export class CrearExperienciaComponent implements OnInit {
  @Output() onCrearExperiencia: EventEmitter<IExperiencia> = new EventEmitter();
  
  experienciaForm!:FormGroup
  constructor(private readonly fb:FormBuilder) { }

  ngOnInit(): void {
    this.experienciaForm=this.initForm();
  }
  onSubmit():void{
    console.log("En el modal")
    const nuevaExperiencia=this.experienciaForm.value;
    this.onCrearExperiencia.emit(nuevaExperiencia)
    this.experienciaForm.reset()
  }

  initForm():FormGroup{
    return this.fb.group({
      nombreTrabajo:['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      posicionLaboral:['',[Validators.minLength(5), Validators.maxLength(30)]],
      descripcionLaboral:['',[Validators.required,Validators.minLength(10), Validators.maxLength(200)]],
      inicioTrabajo:['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      finalizacionTrabajo:['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      fotoTrabajo:['', [Validators.minLength(10), Validators.maxLength(100)]]
    })
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IHabilidad } from 'src/app/interfaces/IHabilidades';

@Component({
  selector: 'app-crear-habilidad-fuerte',
  templateUrl: './crear-habilidad-fuerte.component.html',
  styleUrls: ['./crear-habilidad-fuerte.component.css']
})
export class CrearHabilidadFuerteComponent implements OnInit {
  @Output() onCrearHabilidad: EventEmitter<IHabilidad> = new EventEmitter();
  
  habilidadForm!:FormGroup
  constructor(private readonly fb:FormBuilder) { }

  ngOnInit(): void {
    this.habilidadForm=this.initForm();
  }
  onSubmit():void{
    console.log("En el modal")
    const nuevaHabilidad=this.habilidadForm.value;
    nuevaHabilidad.idPersona=1
    this.onCrearHabilidad.emit(nuevaHabilidad)
    this.habilidadForm.reset()
    location.reload()
  }

  initForm():FormGroup{
    return this.fb.group({
      habilidad:['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      valor:['',[Validators.required, Validators.max(100)]],
    })
  }
}

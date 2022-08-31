import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IHabilidad } from 'src/app/interfaces/IHabilidades';

@Component({
  selector: 'app-crear-habilidad-debil',
  templateUrl: './crear-habilidad-debil.component.html',
  styleUrls: ['./crear-habilidad-debil.component.css']
})
export class CrearHabilidadDebilComponent implements OnInit {
  @Output() onCrearHabilidad: EventEmitter<IHabilidad> = new EventEmitter();
  
  habilidadForm!:FormGroup
  constructor(private readonly fb:FormBuilder) { }

  ngOnInit(): void {
    this.habilidadForm=this.initForm();
  }
  onSubmit():void{
    console.log("En el modal")
    const nuevaHabilidad=this.habilidadForm.value;
    this.onCrearHabilidad.emit(nuevaHabilidad)
    this.habilidadForm.reset()
  }

  initForm():FormGroup{
    return this.fb.group({
      habilidad:['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      valor:['',[Validators.required, Validators.max(100)]],

    })
  }
}

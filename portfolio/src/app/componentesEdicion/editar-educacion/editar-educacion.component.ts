import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEducacion } from 'src/app/interfaces/IEducacion';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-editar-educacion',
  templateUrl: './editar-educacion.component.html',
  styleUrls: ['./editar-educacion.component.css']
})
export class EditarEducacionComponent implements OnInit {
  @Output() onEditEducacion: EventEmitter<IEducacion> = new EventEmitter();
  @Input() id:number=1;
  educacion= this.obtenerEducacion();
  educacionForm!:FormGroup
  constructor(private readonly fb:FormBuilder, private datosPortfolio:PortfolioService) { 
    
  }

  ngOnInit(): void {
    this.educacionForm=this.initForm();
    
  }
  onSubmit():void{
    console.log("En el modal")
    const educacionEditada=this.educacionForm.value;
    this.onEditEducacion.emit(educacionEditada)
    this.educacionForm.reset()
  }

  initForm():FormGroup{
    return this.fb.group({
      institucion:['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      fotoInstitucion:['',[Validators.minLength(10), Validators.maxLength(100)]],
      titulo:['',[Validators.required,Validators.minLength(10), Validators.maxLength(40)]],
      inicioEducacion:['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      finalizacionEducacion:['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    })
  }
  obtenerEducacion(){
    console.log("editando", this.datosPortfolio.buscarEducacion())
    return this.datosPortfolio.buscarEducacion()
  }
}

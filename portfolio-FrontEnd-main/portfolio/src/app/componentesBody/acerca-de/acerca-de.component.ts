import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPersona } from 'src/app/interfaces/IPersona';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  persona:IPersona
  logeado:any
  descripcionForm!:FormGroup
  constructor(private portfolioService:PortfolioService,
     private readonly fb:FormBuilder,
     private readonly auth:AuthService) {
    this.persona = this.portfolioService.obtenerPersona().subscribe((persona:IPersona)=>{
      this.persona = persona
      console.log(this.persona)
    })
   }

  ngOnInit(): void {
    this.descripcionForm=this.FormInit()
    this.logeado=this.auth.autenticado
  }

  onSubmit(event:Event){
    event.preventDefault()
    this.persona.descripcion=this.descripcionForm.get('descripcion')?.value
    this.portfolioService.editPersona(this.persona).subscribe()
    setTimeout(
      function(){
        location.reload()
      },
      750
    )
  }

  FormInit():FormGroup{
    return this.fb.group({
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],

    })
  }

  editarPersona() {
    this.descripcionForm.get('descripcion')?.setValue(this.persona.descripcion);
  }
}

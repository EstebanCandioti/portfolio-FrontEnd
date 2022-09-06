import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPersona } from 'src/app/interfaces/IPersona';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  persona!:IPersona;
  //variables creadas para contener los datos de la persona y que no se pierdan al asignarles el valor del formulario
  idPersona!:number;
  contrasenia!:string;
  email!:string;
  personaForm!: FormGroup;
  constructor(private datosPortfolio:PortfolioService, private readonly fb: FormBuilder) { 
    this.datosPortfolio.obtenerPersona().subscribe(persona=>{
      this.persona=persona
      //datos de la persona asignados a la variable para asignarlos en la persona antes de la edicion
      this.idPersona=persona.id
      this.email=persona.email
      this.contrasenia=persona.contrasenia 
    })
  }

  ngOnInit(): void {
    this.personaForm=this.initForm()
  }
  initForm(): FormGroup {
    return this.fb.group({
      nombre:['',[Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
      ubicacion:['',[Validators.required, Validators.minLength(10), Validators.maxLength(80)]],
      titulos:['', [Validators.minLength(5), Validators.maxLength(80)]],
      descripcion:['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      fotoPerfil:['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      fotoBanner:['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]]
    })
  }
  onSubmit():void{
    console.log("En el modal")
    this.persona=this.personaForm.value;
    //Le reasigno los valores que no entraron en el formulario a la persona para que no se pierdan
    this.persona.id=this.idPersona
    this.persona.contrasenia=this.contrasenia
    this.persona.email=this.email
    this.datosPortfolio.editPersona(this.persona).subscribe()
  }
  editarPersona(persona:IPersona){
    this.personaForm.get('nombre')?.setValue(persona.nombre)
    this.personaForm.get('ubicacion')?.setValue(persona.ubicacion)
    this.personaForm.get('titulos')?.setValue(persona.titulos)
    this.personaForm.get('descripcion')?.setValue(persona.descripcion)
    this.personaForm.get('fotoPerfil')?.setValue(persona.fotoPerfil)
    this.personaForm.get('fotoBanner')?.setValue(persona.fotoBanner)
  }
}

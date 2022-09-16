import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPersona } from 'src/app/interfaces/IPersona';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  persona:IPersona;
  //variables creadas para contener los datos de la persona y que no se pierdan al asignarles el valor del formulario
  idPersona!: number;
  contrasenia: string;
  email: string;
  personaForm!: FormGroup;
  logeado: any;
  constructor(
    private datosPortfolio: PortfolioService,
    private readonly fb: FormBuilder,
    private readonly auth: AuthService
  ) {
    this.persona=this.datosPortfolio.obtenerPersona().subscribe((persona:IPersona)=>{
      this.persona=persona
    })
    this.contrasenia=this.datosPortfolio.obtenerPersona().subscribe((persona:IPersona)=>{
      this.contrasenia=persona.contrasenia
    })
    this.email=this.datosPortfolio.obtenerPersona().subscribe((persona:IPersona)=>{
      this.email=persona.email
    })
  }

  ngOnInit(): void {
    this.personaForm = this.initForm();
    this.logeado = this.auth.autenticado;
  }
  initForm(): FormGroup {
    return this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(60),
        ],
      ],
      ubicacion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(80),
        ],
      ],
      titulos: ['', [Validators.minLength(5), Validators.maxLength(100)]],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      fotoPerfil: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      fotoBanner: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
    });
  }
  onSubmit(): void {
    console.log('En el modal');
    this.persona = this.personaForm.value;
    //Le reasigno los valores que no entraron en el formulario a la persona para que no se pierdan
    this.persona.id = this.idPersona;
    this.persona.contrasenia = this.contrasenia;
    this.persona.email = this.email;
    this.datosPortfolio.editPersona(this.persona).subscribe();
    window.location.reload();
  }
  editarPersona(persona: IPersona) {
    this.personaForm.get('nombre')?.setValue(persona.nombre);
    this.personaForm.get('ubicacion')?.setValue(persona.ubicacion);
    this.personaForm.get('titulos')?.setValue(persona.titulos);
    this.personaForm.get('descripcion')?.setValue(persona.descripcion);
    this.personaForm.get('fotoPerfil')?.setValue(persona.fotoPerfil);
    this.personaForm.get('fotoBanner')?.setValue(persona.fotoBanner);
  }
}

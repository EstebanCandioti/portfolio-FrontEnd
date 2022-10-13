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
  persona: IPersona;
  //variables creadas para contener los datos de la persona y que no se pierdan al asignarles el valor del formulario
  idPersona!: number;
  email: string;
  personaForm!: FormGroup;
  logeado: any;
  constructor(
    private datosPortfolio: PortfolioService,
    private readonly fb: FormBuilder,
    private readonly auth: AuthService
  ) {
    this.persona = this.datosPortfolio
      .obtenerPersona()
      .subscribe((persona: IPersona) => {
        this.persona = persona;
        this.idPersona= persona.id
      });
    this.email = this.datosPortfolio
      .obtenerPersona()
      .subscribe((persona: IPersona) => {
        this.email = persona.email;
      });
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
          Validators.maxLength(150),
        ],
      ],
      fotoBanner: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(150),
        ],
      ],
      instagram: [
        '',
        [
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      numero: [
        '',
        [
          Validators.minLength(13),
          Validators.maxLength(19),
        ],
      ],
      linkedin: [
        '',
        [
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      email:[
        '',
        [Validators.required,Validators.email]
      ]
    });
  }
    /* funcion submit para el envio del formulario: esta funcion usa la variable "AEditar"
    para asigarnle los valores del formulario y la id de la persona,*/
  onSubmit(): void {
    this.persona = this.personaForm.value;
    this.persona.id = this.idPersona;
    this.datosPortfolio.editPersona(this.persona).subscribe();
    setTimeout(
      function(){
        location.reload()
      },
      500
    )
  }
  editarPersona(persona: IPersona) {
    this.personaForm.get('nombre')?.setValue(persona.nombre);
    this.personaForm.get('ubicacion')?.setValue(persona.ubicacion);
    this.personaForm.get('titulos')?.setValue(persona.titulos);
    this.personaForm.get('descripcion')?.setValue(persona.descripcion);
    this.personaForm.get('fotoPerfil')?.setValue(persona.fotoPerfil);
    this.personaForm.get('fotoBanner')?.setValue(persona.fotoBanner);
    this.personaForm.get('instagram')?.setValue(persona.instagram);
    this.personaForm.get('numero')?.setValue(persona.numero);
    this.personaForm.get('linkedin')?.setValue(persona.linkedin);
    this.personaForm.get('email')?.setValue(persona.email);
  }
}

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { IExperiencia } from 'src/app/interfaces/IExperiencia';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  listaExperiencia: IExperiencia[] = [];
  posicionExperiencia!: number;
  posicionesLista!: number;
  experienciaAEditar!: IExperiencia;
  idExperiencia!: number;
  experienciaForm!: FormGroup;
  editar!: boolean;
  logeado: any;
  constructor(
    private datosPortfolio: PortfolioService,
    private readonly fb: FormBuilder,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosExperiencia().subscribe((experiencia) => {
      this.listaExperiencia = experiencia;
      this.posicionesLista = this.datosPortfolio.contadorPosiciones(experiencia);
    });
    this.experienciaForm = this.initForm();
    console.log(this.auth.autenticado)
    this.logeado = this.auth.autenticado;
  }
  //------------------------------FUNCIONES DE FORMULARIOS ------------------------------

  initForm(): FormGroup {
    return this.fb.group({
      nombreTrabajo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      posicionLaboral: [
        '',
        [Validators.minLength(5), Validators.maxLength(30)],
      ],
      descripcionLaboral: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      inicioTrabajo: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      finalizacionTrabajo: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      fotoTrabajo: ['', [Validators.minLength(10), Validators.maxLength(100)]],
      numeroReferencia: ['', [Validators.minLength(13), Validators.maxLength(19)]],

    });
  }

    /*funcion submit para el envio del formulario: esta funcion usa la variable "AEditar"
    para asigarnle los valores del formulario y la id de la persona, 
    el id del objeto y la posicion en la lista (si se esta creando un objeto les asigna id 
    y posicion nueva, si se esta editando uno les asigna los valores que ya tenia)*/
  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('En el modal');
    this.experienciaAEditar = this.experienciaForm.value;
    this.experienciaAEditar.id = this.idExperiencia;
    this.experienciaAEditar.idPersona = 1;
    this.experienciaAEditar.posicion= this.posicionExperiencia
    this.datosPortfolio.editExperiencia(this.experienciaAEditar).subscribe();
    setTimeout(
      function(){
        location.reload()
      },
      500
    )
  }

  editarExperiencia(experiencia: IExperiencia) {
    this.editar = true;
    this.experienciaForm
      .get('nombreTrabajo')
      ?.setValue(experiencia.nombreTrabajo);
    this.experienciaForm
      .get('posicionLaboral')
      ?.setValue(experiencia.posicionLaboral);
    this.experienciaForm
      .get('descripcionLaboral')
      ?.setValue(experiencia.descripcionLaboral);
    this.experienciaForm
      .get('inicioTrabajo')
      ?.setValue(experiencia.inicioTrabajo);
    this.experienciaForm
      .get('finalizacionTrabajo')
      ?.setValue(experiencia.finalizacionTrabajo);
    this.experienciaForm.get('fotoTrabajo')?.setValue(experiencia.fotoTrabajo);
    this.experienciaForm.get('numeroReferencia')?.setValue(experiencia.numeroReferencia);
    this.idExperiencia = experiencia.id;
    this.posicionExperiencia= experiencia.posicion
  }

  reiniciarForm() {
    this.editar = false;
    this.idExperiencia = 0;
    this.experienciaForm.reset();
    this.experienciaForm.get('fotoTrabajo')?.setValue('');
    this.experienciaForm.get('numeroReferencia')?.setValue('');
    this.posicionExperiencia=this.posicionesLista
  }


  //------------------------------ FUNCIONES DRAG AND DROP -----------------------------------

  guardarLista(){
    for(let experiencia of this.listaExperiencia){
      this.datosPortfolio.editExperiencia(experiencia).subscribe()
    }
  }

  drop(event: CdkDragDrop<IExperiencia[]>) {
    console.log(event);
    moveItemInArray(
      this.listaExperiencia,
      event.previousIndex,
      event.currentIndex
    );
    this.listaExperiencia.map((experiencia, index) => {
      experiencia.posicion = index;
      console.log(
        'posicion lista',
        experiencia.nombreTrabajo,
        experiencia.posicion
      );
      this.datosPortfolio.editExperiencia(experiencia);
    });
    console.log(
      this.listaExperiencia[event.currentIndex].nombreTrabajo,
      this.listaExperiencia[event.currentIndex].posicion
    );
    console.log(
      this.listaExperiencia[event.previousIndex].nombreTrabajo,
      this.listaExperiencia[event.previousIndex].posicion
    );
    this.guardarLista()
  }

  //----------------------------------------- OTROS --------------------------------
  deleteExperiencia(experiencia: IExperiencia) {
    this.datosPortfolio.deleteExperiencia(experiencia).subscribe(() => {
      this.listaExperiencia = this.listaExperiencia.filter(
        (t) => t.id !== experiencia.id
      );
    });
  }
}

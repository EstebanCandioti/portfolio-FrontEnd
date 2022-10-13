import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITecnologia } from 'src/app/interfaces/ITecnologia';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.component.html',
  styleUrls: ['./tecnologias.component.css'],
})
export class TecnologiasComponent implements OnInit {
  listaTecnologia: ITecnologia[] = [];
  posicionTecnologia!:number;
  posicionesLista!: number;
  tecnologiaForm!: FormGroup;
  tencnologiaAEditar!: ITecnologia;
  idTecnologia!: number;
  logeado: any;
  editar!: boolean;
  constructor(
    private datosPortfolio: PortfolioService,
    private readonly fb: FormBuilder,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosTecnologia().subscribe((tecnologias) => {
      this.listaTecnologia = tecnologias;
      this.posicionesLista =
        this.datosPortfolio.contadorPosiciones(tecnologias);
    });
    this.tecnologiaForm = this.initForm();
    this.logeado = this.auth.autenticado;
  }

  //funcion delete
  deleteTecnologia(tecnologia: ITecnologia) {
    this.datosPortfolio.deleteTecnologia(tecnologia).subscribe(() => {
      this.listaTecnologia = this.listaTecnologia.filter(
        (t) => t.id !== tecnologia.id
      );
    });
  }

  //funcion editar
  editarTecnologia(tecnologia: ITecnologia) {
    this.editar = true;
    this.tecnologiaForm.get('nombre')?.setValue(tecnologia.nombre);
    this.tecnologiaForm.get('descripcion')?.setValue(tecnologia.descripcion);
    this.tecnologiaForm
      .get('tecnologiaImg')
      ?.setValue(tecnologia.tecnologiaImg);
    this.idTecnologia = tecnologia.id;
    this.posicionTecnologia= tecnologia.posicion
  }

  //formulario
  initForm(): FormGroup {
    return this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      tecnologiaImg: [
        '',
        [Validators.minLength(10), Validators.maxLength(100)],
      ],
    });
  }

  /* funcion submit para el envio del formulario: esta funcion usa la variable "AEditar"
    para asigarnle los valores del formulario y la id de la persona, 
    el id del objeto y la posicion en la lista (si se esta creando un objeto les asigna id 
    y posicion nueva, si se esta editando uno les asigna los valores que ya tenia)*/
  onSubmit(event: Event): void {
    event.preventDefault();
    this.tencnologiaAEditar = this.tecnologiaForm.value;
    this.tencnologiaAEditar.id = this.idTecnologia;
    this.tencnologiaAEditar.idPersona = 1;
    this.tencnologiaAEditar.posicion = this.posicionTecnologia;
    this.datosPortfolio.editTecnologia(this.tencnologiaAEditar).subscribe();
    this.ngOnInit();
    setTimeout(function () {
      location.reload();
    },750
    );
  }

  //limpiar formulario
  reiniciarForm() {
    this.editar = false;
    this.idTecnologia = 0;
    this.tecnologiaForm.reset();
    this.tecnologiaForm.get('tecnologiaImg')?.setValue('');
    this.posicionTecnologia=this.posicionesLista
  }

  guardarLista() {
    for (let tecnologia of this.listaTecnologia) {
      this.datosPortfolio.editTecnologia(tecnologia).subscribe();
    }
  }

  drop(event: CdkDragDrop<ITecnologia[]>) {
    console.log(event);
    moveItemInArray(
      this.listaTecnologia,
      event.previousIndex,
      event.currentIndex
    );
    this.listaTecnologia.map((tecnologia, index) => {
      tecnologia.posicion = index;
    });
    console.log(
      this.listaTecnologia[event.currentIndex].nombre,
      this.listaTecnologia[event.currentIndex].posicion
    );
    console.log(
      this.listaTecnologia[event.previousIndex].nombre,
      this.listaTecnologia[event.previousIndex].posicion
    );

    this.guardarLista();
  }
}

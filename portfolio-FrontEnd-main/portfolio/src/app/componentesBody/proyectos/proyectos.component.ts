import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProyecto } from 'src/app/interfaces/IProyecto';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  listaProyectos: IProyecto[] = [];
  posicionProyecto!:number;
  posicionesLista!: number;
  proyectoForm!: FormGroup;
  idProyecto!: number;
  proyectoAEditar!: IProyecto;
  logeado: any;
  editar!: boolean;
  constructor(
    private datosPortfolio: PortfolioService,
    private fb: FormBuilder,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosProyectos().subscribe((proyectos) => {
      this.listaProyectos = proyectos;
      this.posicionesLista = this.datosPortfolio.contadorPosiciones(proyectos);
    });
    this.proyectoForm = this.initForm();
    this.logeado = this.auth.autenticado;
  }
  deleteProyecto(proyecto: IProyecto) {
    console.log('borrando' + proyecto);
    this.datosPortfolio.deleteProyecto(proyecto).subscribe(() => {
      this.listaProyectos = this.listaProyectos.filter(
        (t) => t.id !== proyecto.id
      );
    });
  }

  //-------------------------------------------------------- FUNCIONES FORMULARIOS ---------------------------------------------------

  //asigna los valores del objeto al formulario para poder editarlos
  editarProyecto(proyecto: IProyecto) {
    this.editar = true;
    this.proyectoForm.get('nombre')?.setValue(proyecto.nombre);
    this.proyectoForm.get('fotoProyecto')?.setValue(proyecto.fotoProyecto);
    this.proyectoForm.get('descripcion')?.setValue(proyecto.descripcion);
    this.proyectoForm.get('inicioProyecto')?.setValue(proyecto.inicioProyecto);
    this.proyectoForm
      .get('finalizacionProyecto')
      ?.setValue(proyecto.finalizacionProyecto);
    this.proyectoForm.get('link1')?.setValue(proyecto.link1);
    this.proyectoForm
      .get('descripcionLink1')
      ?.setValue(proyecto.descripcionLink1);
    this.proyectoForm.get('link2')?.setValue(proyecto.link2);
    this.proyectoForm
      .get('descripcionLink2')
      ?.setValue(proyecto.descripcionLink2);
    this.proyectoForm.get('link3')?.setValue(proyecto.link3);
    this.proyectoForm
      .get('descripcionLink3')
      ?.setValue(proyecto.descripcionLink3);
    this.idProyecto = proyecto.id;
    this.posicionProyecto=proyecto.posicion
  }

  /* funcion submit para el envio del formulario: esta funcion usa la variable "AEditar"
    para asigarnle los valores del formulario y la id de la persona, 
    el id del objeto y la posicion en la lista (si se esta creando un objeto les asigna id 
    y posicion nueva, si se esta editando uno les asigna los valores que ya tenia)*/
  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('En el componente');
    this.proyectoAEditar = this.proyectoForm.value;
    this.proyectoAEditar.id = this.idProyecto;
    this.proyectoAEditar.idPersona = 1;
    this.proyectoAEditar.posicion = this.posicionProyecto
    this.datosPortfolio.editProyecto(this.proyectoAEditar).subscribe();
    this.ngOnInit();
    setTimeout(
      function(){
        console.log("temporizador puesto")
        location.reload()
      },
      500
    )
  }

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
      fotoProyecto: ['', [Validators.minLength(10), Validators.maxLength(100)]],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      inicioProyecto: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      finalizacionProyecto: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      link1: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(100),
        ],
      ],
      descripcionLink1: [
        '',
        [Validators.minLength(10), Validators.maxLength(100)],
      ],
      link2: ['', [Validators.minLength(20), Validators.maxLength(100)]],
      descripcionLink2: [
        '',
        [Validators.minLength(10), Validators.maxLength(100)],
      ],
      link3: ['', [Validators.minLength(20), Validators.maxLength(100)]],
      descripcionLink3: [
        '',
        [Validators.minLength(10), Validators.maxLength(100)],
      ],
    });
  }

  reiniciarForm() {
    this.editar = false;
    this.idProyecto = 0;
    this.proyectoForm.reset();
    this.proyectoForm.get('fotoProyecto')?.setValue('');
    this.proyectoForm.get('descripcionLink1')?.setValue('');
    this.proyectoForm.get('descripcionLink2')?.setValue('');
    this.proyectoForm.get('descripcionLink3')?.setValue('');
    this.proyectoForm.get('link2')?.setValue('');
    this.proyectoForm.get('link3')?.setValue('');
    this.posicionProyecto=this.posicionesLista
  }

  //----------------------------------------------------- FUNCIONES DRAG AND DROP --------------------------------------------------------
  //actualizar todos los items de la lista
  guardarLista() {
    for (let proyecto of this.listaProyectos) {
      this.datosPortfolio.editProyecto(proyecto).subscribe();
    }
  }

  drop(event: CdkDragDrop<IProyecto[]>) {
    moveItemInArray(
      this.listaProyectos,
      event.previousIndex,
      event.currentIndex
    );
    this.listaProyectos.map((proyecto, index) => {
      proyecto.posicion = index;
    });
    console.log(
      this.listaProyectos[event.currentIndex].nombre,
      this.listaProyectos[event.currentIndex].posicion
    );
    console.log(
      this.listaProyectos[event.previousIndex].nombre,
      this.listaProyectos[event.previousIndex].posicion
    );
    this.guardarLista();
  }
}

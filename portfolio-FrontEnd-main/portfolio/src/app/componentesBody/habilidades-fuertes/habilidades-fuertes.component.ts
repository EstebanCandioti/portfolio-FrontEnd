import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IHabilidad } from 'src/app/interfaces/IHabilidades';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
@Component({
  selector: 'app-habilidades-fuertes',
  templateUrl: './habilidades-fuertes.component.html',
  styleUrls: ['./habilidades-fuertes.component.css'],
})
export class HabilidadesFuertesComponent implements OnInit {
  listaHabilidadesFuertes: IHabilidad[] = [];
  posicionesLista!: number;
  habilidadForm: FormGroup;
  posicionHabilidad!:number;
  idHabilidad!: number;
  habilidadAEditar!: IHabilidad;
  editar!: boolean;
  logeado: any;

  constructor(
    private datosPortfolio: PortfolioService,
    private readonly fb: FormBuilder,
    private readonly auth: AuthService
  ) {
    this.habilidadForm = this.initForm();
  }

  ngOnInit(): void {
    this.datosPortfolio
      .obtenerDatosHabilidadesFuertes()
      .subscribe((habilidades) => {
        this.listaHabilidadesFuertes = habilidades;
        this.posicionesLista = this.datosPortfolio.contadorPosiciones(habilidades);
      });
    this.logeado = this.auth.autenticado;
  }

  deleteHabilidadFuerte(habilidad: IHabilidad): void {
    this.datosPortfolio.deleteHabilidadFuerte(habilidad).subscribe(() => {
      this.listaHabilidadesFuertes = this.listaHabilidadesFuertes.filter(
        (t) => t.id !== habilidad.id
      );
    });
  }
  /* funcion submit para el envio del formulario: esta funcion usa la variable "AEditar"
    para asigarnle los valores del formulario y la id de la persona, 
    el id del objeto y la posicion en la lista (si se esta creando un objeto les asigna id 
    y posicion nueva, si se esta editando uno les asigna los valores que ya tenia)*/
  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('En el modal');
    this.habilidadAEditar = this.habilidadForm.value;
    this.habilidadAEditar.id = this.idHabilidad;
    this.habilidadAEditar.idPersona = 1;
    this.habilidadAEditar.posicion=this.posicionHabilidad
    this.datosPortfolio.editHabilidadFuerte(this.habilidadAEditar).subscribe();
    this.ngOnInit();
    setTimeout(
      function(){
        location.reload()
      },
      500
    )
  }

  initForm(): FormGroup {
    return this.fb.group({
      habilidad: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      valor: ['', [Validators.required, Validators.max(100)]],

      
      
    });
  }

  editarHabilidadFuerte(habilidad: IHabilidad) {
    this.editar = true;
    this.habilidadForm.get('habilidad')?.setValue(habilidad.habilidad);
    this.habilidadForm.get('valor')?.setValue(habilidad.valor);
    this.posicionHabilidad=habilidad.posicion
    this.idHabilidad = habilidad.id;
  }

  reiniciarForm() {
    this.editar = false;
    this.habilidadForm.reset();
    this.idHabilidad = 0;
    this.posicionHabilidad=this.posicionesLista;
  }

  //----------------------------------------- FUNCIONES DRAG AND DROP ----------------------------------------------------

  guardarLista() {
    for (let habilidad of this.listaHabilidadesFuertes) {
      this.datosPortfolio.editHabilidadFuerte(habilidad).subscribe();
    }
  }

  drop(event: CdkDragDrop<IHabilidad[]>) {
    moveItemInArray(
      this.listaHabilidadesFuertes,
      event.previousIndex,
      event.currentIndex
    );

    this.listaHabilidadesFuertes.map((habilidad, index) => {
      habilidad.posicion = index;
    });

    console.log(
      this.listaHabilidadesFuertes[event.currentIndex].habilidad,
      this.listaHabilidadesFuertes[event.currentIndex].posicion
    );

    console.log(
      this.listaHabilidadesFuertes[event.previousIndex].habilidad,
      this.listaHabilidadesFuertes[event.previousIndex].posicion
    );

    this.guardarLista();
  }
}

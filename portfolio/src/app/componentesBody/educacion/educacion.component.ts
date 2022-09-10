import { Component, OnInit } from '@angular/core';
import { IEducacion } from 'src/app/interfaces/IEducacion';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import {CdkDragDrop, moveItemInArray,} from '@angular/cdk/drag-drop'
@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  listaEducacion: IEducacion[] = [];
  educacionAEditar!: IEducacion;
  idEducacion!: number;
  educacionForm!: FormGroup;
  editar!: boolean;
  logeado: any;
  constructor(
    private datosPortfolio: PortfolioService,
    private readonly fb: FormBuilder,
    private readonly auth: AuthService
  ) {}
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosEducacion().subscribe((educacion) => {
      this.listaEducacion = educacion;
    });
    this.educacionForm = this.initForm();
    this.logeado = this.auth.autenticado;
  }

  deleteEducacion(educacion: IEducacion) {
    this.datosPortfolio.deleteEducacion(educacion).subscribe(() => {
      this.listaEducacion = this.listaEducacion.filter(
        (t) => t.id !== educacion.id
      );
    });
  }

  initForm(): FormGroup {
    return this.fb.group({
      institucion: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      fotoInstitucion: [
        '',
        [Validators.minLength(10), Validators.maxLength(100)],
      ],
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(40),
        ],
      ],
      inicioEducacion: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      finalizacionEducacion: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('En el modal');
    this.educacionAEditar = this.educacionForm.value;
    this.educacionAEditar.id = this.idEducacion;
    this.educacionAEditar.idPersona = 1;
    this.datosPortfolio.editEducacion(this.educacionAEditar).subscribe();
    window.location.reload();

  }
  editarEducacion(educacion: IEducacion) {
    this.editar = true;
    this.educacionForm.get('institucion')?.setValue(educacion.institucion);
    this.educacionForm
      .get('fotoInstitucion')
      ?.setValue(educacion.fotoInstitucion);
    this.educacionForm.get('titulo')?.setValue(educacion.titulo);
    this.educacionForm
      .get('inicioEducacion')
      ?.setValue(educacion.inicioEducacion);
    this.educacionForm
      .get('finalizacionEducacion')
      ?.setValue(educacion.finalizacionEducacion);
    this.idEducacion = educacion.id;
  }
  reiniciarForm() {
    this.editar = false;
    this.idEducacion = 0;
    this.educacionForm.reset();
    this.educacionForm.get('fotoInstitucion')?.setValue('');
  }

  drop(event: CdkDragDrop<IEducacion[]>) {
    moveItemInArray(this.listaEducacion, event.previousIndex, event.currentIndex);
  }
}

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
  habilidadForm: FormGroup;
  idHabilidad!: number;
  habilidadAEditar!: IHabilidad;
  editar!:boolean
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
  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('En el modal');
    this.habilidadAEditar = this.habilidadForm.value;
    this.habilidadAEditar.id = this.idHabilidad;
    this.habilidadAEditar.idPersona = 1;
    this.datosPortfolio.editHabilidadFuerte(this.habilidadAEditar).subscribe();
    window.location.reload();
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
    this.idHabilidad = habilidad.id;
  }
  reiniciarForm() {
    this.editar = false;
    this.habilidadForm.reset();
    this.idHabilidad = 0;
  }
  drop(event: CdkDragDrop<IHabilidad[]>) {
    moveItemInArray(this.listaHabilidadesFuertes, event.previousIndex, event.currentIndex);
  }
}


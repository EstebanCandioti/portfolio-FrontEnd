import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProyecto } from 'src/app/interfaces/IProyecto';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css'],
})
export class CrearProyectoComponent implements OnInit {
  @Output() onCrearProyecto: EventEmitter<IProyecto> = new EventEmitter();
  link1Required: boolean = false;
  proyectoForm!: FormGroup;
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.proyectoForm = this.initForm();
  }
  onSubmit(): void {
    console.log('En el modal' + this.proyectoForm.value);
    const nuevaExperiencia = this.proyectoForm.value;
    this.onCrearProyecto.emit(nuevaExperiencia);
    this.proyectoForm.reset();
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
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      descripcionLink1: [
        '',
        [Validators.minLength(10), Validators.maxLength(100)],
      ],
      link2: [
        '', 
        [Validators.minLength(10), Validators.maxLength(100)]
      ],
      descripcionLink2: [
        '',
      [Validators.minLength(10), Validators.maxLength(100)],
      ],
      link3: [
        '', 
        [Validators.minLength(10), Validators.maxLength(100)]
      ],
      descripcionLink3: [
        '',
        [Validators.minLength(10), Validators.maxLength(100)],
      ],
    });
  }
}

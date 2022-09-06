import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProyecto } from 'src/app/interfaces/IProyecto';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  listaProyectos:IProyecto[]=[];
  proyectoForm!:FormGroup
  idProyecto!:number
  proyectoAEditar!:IProyecto
  constructor(private datosPortfolio:PortfolioService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosProyectos().subscribe(proyectos => {
      this.listaProyectos=proyectos;
    });
    this.proyectoForm=this.initForm();
  }
  deleteProyecto(proyecto:IProyecto){
    console.log("borrando"+proyecto)
    this.datosPortfolio.deleteProyecto(proyecto).subscribe(()=> {
      this.listaProyectos=this.listaProyectos.filter(t=>t.id !== proyecto.id)
    });
  }
  crearProyecto(proyecto:IProyecto){
    this.datosPortfolio.crearProyecto(proyecto).subscribe(()=>{
      this.listaProyectos.push(proyecto);
    })
  }

  buscarProyecto(proyecto:IProyecto){
    this.datosPortfolio.buscarProyecto(proyecto).subscribe(proyecto =>{
      this.proyectoForm.get('nombre')?.setValue(proyecto.nombre)
      this.proyectoForm.get('fotoProyecto')?.setValue(proyecto.fotoProyecto)
      this.proyectoForm.get('descripcion')?.setValue(proyecto.descripcion)
      this.proyectoForm.get('inicioProyecto')?.setValue(proyecto.inicioProyecto)
      this.proyectoForm.get('finalizacionProyecto')?.setValue(proyecto.finalizacionProyecto)
      this.proyectoForm.get('link1')?.setValue(proyecto.link1)
      this.proyectoForm.get('descripcionLink1')?.setValue(proyecto.descripcionLink1)
      this.proyectoForm.get('link2')?.setValue(proyecto.link2)
      this.proyectoForm.get('descripcionLink2')?.setValue(proyecto.descripcionLink2)
      this.proyectoForm.get('link3')?.setValue(proyecto.link3)
      this.proyectoForm.get('descripcionLink3')?.setValue(proyecto.descripcionLink3)
      this.idProyecto=proyecto.id
    });
  }

  onSubmit():void{
    console.log("En el modal")
    this.proyectoAEditar=this.proyectoForm.value;
    this.proyectoAEditar.id=this.idProyecto
    this.proyectoAEditar.idPersona=1;
    this.datosPortfolio.editProyecto(this.proyectoAEditar).subscribe()
    location.reload();
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

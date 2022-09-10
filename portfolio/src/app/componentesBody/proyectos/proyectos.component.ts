import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProyecto } from 'src/app/interfaces/IProyecto';
import { AuthService } from 'src/app/servicios/auth.service';
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
  logeado:any
  editar!:boolean
  constructor(private datosPortfolio:PortfolioService, private fb:FormBuilder, private readonly auth:AuthService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosProyectos().subscribe(proyectos => {
      this.listaProyectos=proyectos;
    });
    this.proyectoForm=this.initForm();
    this.logeado=this.auth.autenticado
  }
  deleteProyecto(proyecto:IProyecto){
    console.log("borrando"+proyecto)
    this.datosPortfolio.deleteProyecto(proyecto).subscribe(()=> {
      this.listaProyectos=this.listaProyectos.filter(t=>t.id !== proyecto.id)
    });
  }
  //asigna los valores del objeto al formulario para poder editarlos
  editarProyecto(proyecto:IProyecto){
    this.editar=true
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
  }

  /*asigna el valor del formulario a una variable junto al id de la persona y al id del proyecto antes de enviarlo en el servicio,
    tambien recarga la pagina para mostrar los nuevos valores*/ 
  onSubmit(event:Event):void{
    event.preventDefault()
    console.log("En el componente")
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
  /*funcion que reinicia el formulario y le asigna valores vacios a los parametros opcionales para facilitar la vaildacion del formulario,
  re asigna en 0 el id del objeto para que cuando se lo asigne la funcion onSubmit y cuando sea enviado al servicio cree un objeto nuevo
  y cambia la variable editar a false para cambiar el titulo del formulario*/
  reiniciarForm(){
    this.editar=false
    this.idProyecto=0
    this.proyectoForm.reset()
    this.proyectoForm.get('fotoProyecto')?.setValue('')
    this.proyectoForm.get('descripcionLink1')?.setValue('')
    this.proyectoForm.get('descripcionLink2')?.setValue('')
    this.proyectoForm.get('descripcionLink3')?.setValue('')
    this.proyectoForm.get('link2')?.setValue('')
    this.proyectoForm.get('link3')?.setValue('')
  }
  drop(event: CdkDragDrop<IProyecto[]>) {
    moveItemInArray(this.listaProyectos, event.previousIndex, event.currentIndex);
  }
}

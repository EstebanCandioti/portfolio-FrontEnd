import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IExperiencia } from 'src/app/interfaces/IExperiencia';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  listaExperiencia:IExperiencia []=[];
  experienciaAEditar!:IExperiencia
  idExperiencia!:number
  experienciaForm!:FormGroup
  editar!:boolean
  logeado:any
  constructor(private datosPortfolio:PortfolioService, private readonly fb:FormBuilder, private readonly auth:AuthService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosExperiencia().subscribe(experiencia=>{
      this.listaExperiencia = experiencia;
    });
    this.experienciaForm=this.initForm();
    this.logeado= this.auth.autenticado
    }
    
  deleteExperiencia(experiencia:IExperiencia) {
     this.datosPortfolio.deleteExperiencia(experiencia).subscribe(()=> {
          this.listaExperiencia=this.listaExperiencia.filter(t=>t.id !== experiencia.id);
    })
  }

  crearExperiencia(experiencia:IExperiencia){
    console.log("en el componente")
    experiencia.idPersona=1
    this.datosPortfolio.crearExperiencia(experiencia).subscribe(experiencia=>{
      this.listaExperiencia.push(experiencia);
    })
    location.reload();
  }

  initForm():FormGroup{
    return this.fb.group({
      nombreTrabajo:['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      posicionLaboral:['',[Validators.minLength(5), Validators.maxLength(30)]],
      descripcionLaboral:['',[Validators.required,Validators.minLength(10), Validators.maxLength(200)]],
      inicioTrabajo:['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      finalizacionTrabajo:['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      fotoTrabajo:['', [Validators.minLength(10), Validators.maxLength(100)]]
    })
  }

  onSubmit(event:Event):void{
    event.preventDefault()
    console.log("En el modal")
    this.experienciaAEditar=this.experienciaForm.value;
    this.experienciaAEditar.id=this.idExperiencia;
    this.experienciaAEditar.idPersona=1
    this.experienciaAEditar.posicion=this.listaExperiencia.length+1
    this.datosPortfolio.editExperiencia(this.experienciaAEditar).subscribe()
    location.reload();
  }
  editarExperiencia(experiencia:IExperiencia){
    this.editar=true
      this.experienciaForm.get('nombreTrabajo')?.setValue(experiencia.nombreTrabajo)
      this.experienciaForm.get('posicionLaboral')?.setValue(experiencia.posicionLaboral)
      this.experienciaForm.get('descripcionLaboral')?.setValue(experiencia.descripcionLaboral)
      this.experienciaForm.get('inicioTrabajo')?.setValue(experiencia.inicioTrabajo)
      this.experienciaForm.get('finalizacionTrabajo')?.setValue(experiencia.finalizacionTrabajo)
      this.experienciaForm.get('fotoTrabajo')?.setValue(experiencia.fotoTrabajo)
      this.idExperiencia=experiencia.id

  }
  reiniciarForm(){
    this.editar=false
    this.idExperiencia=0
    this.experienciaForm.reset()
    this.experienciaForm.get('fotoTrabajo')?.setValue('')
  }
  //actualizar todos los items de la lista
  guardarLista(experiencia1:IExperiencia, experiencia2:IExperiencia) {
    this.datosPortfolio.editExperiencia(experiencia1).subscribe();
    this.datosPortfolio.editExperiencia(experiencia2).subscribe();
  }
  drop(event: CdkDragDrop<IExperiencia[]>) {
    moveItemInArray(this.listaExperiencia, event.previousIndex, event.currentIndex);
    this.listaExperiencia.map((tecnologia, index) => {
      tecnologia.posicion = index;
    });
    console.log(
      this.listaExperiencia[event.currentIndex].nombreTrabajo,
      this.listaExperiencia[event.currentIndex].posicion
    );
    console.log(
      this.listaExperiencia[event.previousIndex].nombreTrabajo,
      this.listaExperiencia[event.previousIndex].posicion
    );
    this.guardarLista(this.listaExperiencia[event.currentIndex], this.listaExperiencia[event.previousIndex]);
  }
}
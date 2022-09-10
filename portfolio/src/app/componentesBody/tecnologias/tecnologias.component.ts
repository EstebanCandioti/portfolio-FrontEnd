import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITecnologia } from 'src/app/interfaces/ITecnologia';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.component.html',
  styleUrls: ['./tecnologias.component.css']
})
export class TecnologiasComponent implements OnInit {
  listaTecnologia:ITecnologia[]=[];
  tecnologiaForm!: FormGroup
  tencnologiaAEditar!:ITecnologia
  idTecnologia!:number
  logeado:any
  editar!:boolean
  constructor(private datosPortfolio:PortfolioService, private readonly fb:FormBuilder, private readonly auth:AuthService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosTecnologia().subscribe(tecnologias => {
      this.listaTecnologia=tecnologias;
    });
    this.tecnologiaForm=this.initForm();
    this.logeado=this.auth.autenticado
  }

  deleteTecnologia(tecnologia:ITecnologia){
    this.datosPortfolio.deleteTecnologia(tecnologia).subscribe(()=>{
      this.listaTecnologia=this.listaTecnologia.filter(t=>t.id !== tecnologia.id)
    })
  }
  editTecnologia(tecnologia:ITecnologia){
    this.datosPortfolio.editTecnologia(tecnologia).subscribe(()=>{
      this.listaTecnologia[tecnologia.id]=tecnologia;
    })
  }
  crearTecnologia(tecnologia:ITecnologia){
    this.datosPortfolio.crearTecnologia(tecnologia).subscribe(tecnologia=>{
      this.listaTecnologia.push(tecnologia);
    });
  }
  editarTecnologia(tecnologia:ITecnologia){
    this.editar=true
    this.tecnologiaForm.get('nombre')?.setValue(tecnologia.nombre);
    this.tecnologiaForm.get('descripcion')?.setValue(tecnologia.descripcion);
    this.tecnologiaForm.get('tecnologiaImg')?.setValue(tecnologia.tecnologiaImg);
    this.idTecnologia=tecnologia.id
  }
  initForm():FormGroup{
    return this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      descripcion:['',[Validators.required,Validators.minLength(10), Validators.maxLength(200)]],
      tecnologiaImg:['',[Validators.minLength(10), Validators.maxLength(100)]]
    })
  }
  
  onSubmit(event:Event):void{
    event.preventDefault()
    console.log("En el modal")
    this.tencnologiaAEditar=this.tecnologiaForm.value;
    this.tencnologiaAEditar.id=this.idTecnologia;
    this.tencnologiaAEditar.idPersona=1
    this.datosPortfolio.editTecnologia(this.tencnologiaAEditar).subscribe()
    location.reload();
  }

  reiniciarForm(){
    this.editar=false
    this.idTecnologia=0
    this.tecnologiaForm.reset()
    this.tecnologiaForm.get('tecnologiaImg')?.setValue('')
  }

  drop(event: CdkDragDrop<ITecnologia[]>) {
    moveItemInArray(this.listaTecnologia, event.previousIndex, event.currentIndex);
  }
}
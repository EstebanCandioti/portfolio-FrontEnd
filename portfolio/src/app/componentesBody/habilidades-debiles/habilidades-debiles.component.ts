import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IHabilidad } from 'src/app/interfaces/IHabilidades';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
@Component({
  selector: 'app-habilidades-debiles',
  templateUrl: './habilidades-debiles.component.html',
  styleUrls: ['./habilidades-debiles.component.css']
})
export class HabilidadesDebilesComponent implements OnInit {
  listaHabilidadesDebiles:IHabilidad[]=[];
  habilidadForm!:FormGroup;
  idHabilidad!:number
  habilidadAEditar!:IHabilidad
  editar!:boolean
  logeado:any
  constructor(private datosPortfolio:PortfolioService, private readonly fb:FormBuilder, private readonly auth:AuthService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosHabilidadesDebiles().subscribe(habilidades => {
      this.listaHabilidadesDebiles=habilidades;
    });
    this.habilidadForm= this.initForm();
    this.logeado=this.auth.autenticado
  }

  deleteHabilidadDebil(habilidad:IHabilidad):void {
    this.datosPortfolio.deleteHabilidadDebil(habilidad).subscribe(() =>{
      this.listaHabilidadesDebiles=this.listaHabilidadesDebiles.filter(t=>t.id !==habilidad.id)
    })
  }
  onSubmit(event: Event):void{
    event.preventDefault()
    console.log("En el modal")
    this.habilidadAEditar=this.habilidadForm.value;
    this.habilidadAEditar.id=this.idHabilidad
    this.habilidadAEditar.idPersona=1;
    this.habilidadAEditar.posicion=this.listaHabilidadesDebiles.length+1
    this.datosPortfolio.editHabilidadDebil(this.habilidadAEditar).subscribe()
    location.reload();
  }
  crearHabilidadDebil(habilidad:IHabilidad){
    console.log("en el componente")
    habilidad.idPersona=1;
    this.datosPortfolio.crearHabilidadDebil(habilidad).subscribe(habilidad=>{
      this.listaHabilidadesDebiles.push(habilidad);
    })
    location.reload();
  }
  initForm():FormGroup{
    return this.fb.group({
      habilidad:['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      valor:['',[Validators.required, Validators.max(100)]],
    })
  }
  editarHabilidad(habilidad:IHabilidad){
    this.editar=true
    this.habilidadForm.get('habilidad')?.setValue(habilidad.habilidad)
    this.habilidadForm.get('valor')?.setValue(habilidad.valor)
    this.idHabilidad =habilidad.id
  }
  reiniciarForm(){
    this.editar=false
    this.idHabilidad=0
    this.habilidadForm.reset()
    this.habilidadForm.get('fotoTrabajo')?.setValue('')
  }

  guardarLista(habilidad1:IHabilidad, habilidad2:IHabilidad){
    this.datosPortfolio.editHabilidadDebil(habilidad1).subscribe();
    this.datosPortfolio.editHabilidadDebil(habilidad2).subscribe();
  }
  drop(event: CdkDragDrop<IHabilidad[]>) {
    moveItemInArray(this.listaHabilidadesDebiles, event.previousIndex, event.currentIndex);
    this.listaHabilidadesDebiles.map((tecnologia, index) => {
      tecnologia.posicion = index;
    });
    console.log(
      this.listaHabilidadesDebiles[event.currentIndex].habilidad,
      this.listaHabilidadesDebiles[event.currentIndex].posicion
    );
    console.log(
      this.listaHabilidadesDebiles[event.previousIndex].habilidad,
      this.listaHabilidadesDebiles[event.previousIndex].posicion
    );
    this.guardarLista(this.listaHabilidadesDebiles[event.currentIndex], this.listaHabilidadesDebiles[event.previousIndex]);
  }
}

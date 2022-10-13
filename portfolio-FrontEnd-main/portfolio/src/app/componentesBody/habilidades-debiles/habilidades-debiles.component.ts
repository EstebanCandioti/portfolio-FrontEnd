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
  posicionesLista!: number;
  posicionHabilidad!:number;
  habilidadForm!:FormGroup;
  idHabilidad!:number
  habilidadAEditar!:IHabilidad
  editar!:boolean
  logeado:any
  constructor(private datosPortfolio:PortfolioService, private readonly fb:FormBuilder, private readonly auth:AuthService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosHabilidadesDebiles().subscribe(habilidades => {
      this.listaHabilidadesDebiles=habilidades;
      this.posicionesLista = this.datosPortfolio.contadorPosiciones(habilidades);
    });
    this.habilidadForm= this.initForm();
    this.logeado=this.auth.autenticado
  }

  //---------------------------------------------------------------- FUNCIONES FORMULARIOS --------------------------------------------------------

    /* funcion submit para el envio del formulario: esta funcion usa la variable "AEditar"
    para asigarnle los valores del formulario y la id de la persona, 
    el id del objeto y la posicion en la lista (si se esta creando un objeto les asigna id 
    y posicion nueva, si se esta editando uno les asigna los valores que ya tenia)*/
  onSubmit(event: Event):void{
    event.preventDefault()
    console.log("En el modal")
    this.habilidadAEditar=this.habilidadForm.value;
    this.habilidadAEditar.id=this.idHabilidad
    this.habilidadAEditar.idPersona=1;
    this.habilidadAEditar.posicion=this.posicionHabilidad
    this.datosPortfolio.editHabilidadDebil(this.habilidadAEditar).subscribe()
    setTimeout(
      function(){
        location.reload()
      },
      750
    )
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
    this.posicionHabilidad=habilidad.posicion
  }

  reiniciarForm(){
    this.editar=false
    this.idHabilidad=0
    this.habilidadForm.reset()
    this.posicionHabilidad=this.posicionesLista
  }

  //----------------------------------------- FUNCIONES DRAG AND DROP ----------------------------------------------------

  guardarLista(){
    for(let habilidad of this.listaHabilidadesDebiles){
      this.datosPortfolio.editHabilidadDebil(habilidad).subscribe();
    }
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

    this.guardarLista()
  }

  //---------------------------------------------------------------- OTROS ----------------------------------------------------------------

  deleteHabilidadDebil(habilidad:IHabilidad):void {
    this.datosPortfolio.deleteHabilidadDebil(habilidad).subscribe(() =>{
      this.listaHabilidadesDebiles=this.listaHabilidadesDebiles.filter(t=>t.id !==habilidad.id)
    })
  }
}

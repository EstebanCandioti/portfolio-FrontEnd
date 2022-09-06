import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IHabilidad } from 'src/app/interfaces/IHabilidades';
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
  constructor(private datosPortfolio:PortfolioService, private readonly fb:FormBuilder) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosHabilidadesDebiles().subscribe(habilidades => {
      this.listaHabilidadesDebiles=habilidades;
    });
    this.habilidadForm= this.initForm();
  }

  deleteHabilidadDebil(habilidad:IHabilidad):void {
    this.datosPortfolio.deleteHabilidadDebil(habilidad).subscribe(() =>{
      this.listaHabilidadesDebiles=this.listaHabilidadesDebiles.filter(t=>t.id !==habilidad.id)
    })
  }
  onSubmit():void{
    console.log("En el modal")
    this.habilidadAEditar=this.habilidadForm.value;
    this.habilidadAEditar.id=this.idHabilidad
    this.habilidadAEditar.idPersona=1;
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
  buscarHabilidad(habilidad:IHabilidad){
    this.datosPortfolio.buscarHabilidadDebil(habilidad).subscribe(habilidad =>{
      this.habilidadForm.get('habilidad')?.setValue(habilidad.habilidad)
      this.habilidadForm.get('valor')?.setValue(habilidad.valor)
      this.idHabilidad =habilidad.id
    })
  }
}

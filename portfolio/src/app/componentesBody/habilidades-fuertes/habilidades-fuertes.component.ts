import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IHabilidad } from 'src/app/interfaces/IHabilidades';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
@Component({
  selector: 'app-habilidades-fuertes',
  templateUrl: './habilidades-fuertes.component.html',
  styleUrls: ['./habilidades-fuertes.component.css']
})
export class HabilidadesFuertesComponent implements OnInit {
  listaHabilidadesFuertes:IHabilidad[]=[];
  habilidadForm!:FormGroup;
  idHabilidad!:number
  habilidadAEditar!:IHabilidad
  constructor(private datosPortfolio:PortfolioService, private readonly fb:FormBuilder) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosHabilidadesFuertes().subscribe(habilidades => {
      this.listaHabilidadesFuertes=habilidades;
    });
    this.habilidadForm= this.initForm();
  }

  deleteHabilidadFuerte(habilidad:IHabilidad):void {
    this.datosPortfolio.deleteHabilidadFuerte(habilidad).subscribe(() =>{
      this.listaHabilidadesFuertes=this.listaHabilidadesFuertes.filter(t=>t.id !==habilidad.id)
    })
  }
  onSubmit():void{
    console.log("En el modal")
    this.habilidadAEditar=this.habilidadForm.value;
    this.habilidadAEditar.id=this.idHabilidad
    this.habilidadAEditar.idPersona=1;
    this.datosPortfolio.editHabilidadFuerte(this.habilidadAEditar).subscribe()
    location.reload();
  }
  crearHabilidadFuerte(habilidad:IHabilidad){
    console.log("en el componente")
    habilidad.idPersona=1;
    this.datosPortfolio.crearHabilidadDebil(habilidad).subscribe(habilidad=>{
      this.listaHabilidadesFuertes.push(habilidad);
    })
    location.reload();
  }
  initForm():FormGroup{
    return this.fb.group({
      habilidad:['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      valor:['',[Validators.required, Validators.max(100)]],
    })
  }
  buscarHabilidadFuerte(habilidad:IHabilidad){
    this.datosPortfolio.buscarHabilidadFuerte(habilidad).subscribe(habilidad =>{
      this.habilidadForm.get('habilidad')?.setValue(habilidad.habilidad)
      this.habilidadForm.get('valor')?.setValue(habilidad.valor)
      this.idHabilidad =habilidad.id
    })
  }
}

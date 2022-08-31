import { Component, OnInit } from '@angular/core';
import { IHabilidad } from 'src/app/interfaces/IHabilidades';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
@Component({
  selector: 'app-habilidades-debiles',
  templateUrl: './habilidades-debiles.component.html',
  styleUrls: ['./habilidades-debiles.component.css']
})
export class HabilidadesDebilesComponent implements OnInit {
  listaHabilidadesDebiles:IHabilidad[]=[];
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosHabilidadesDebiles().subscribe(habilidades => {
      this.listaHabilidadesDebiles=habilidades;
    });
  }

  deleteHabilidadDebil(habilidad:IHabilidad):void {
    this.datosPortfolio.deleteHabilidadDebil(habilidad).subscribe(() =>{
      this.listaHabilidadesDebiles=this.listaHabilidadesDebiles.filter(t=>t.id !==habilidad.id)
    })
  }

  editHabilidadDebil(habilidad:IHabilidad):void {
    this.datosPortfolio.editHabilidadDebil(habilidad).subscribe(()=>{
      this.listaHabilidadesDebiles[habilidad.id]=habilidad;
    })
  }

  crearHabilidadDebil(habilidad:IHabilidad){
    console.log("en el componente")
    this.datosPortfolio.crearHabilidadDebil(habilidad).subscribe(habilidad=>{
      this.listaHabilidadesDebiles.push(habilidad);
    })
  }
}

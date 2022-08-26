import { Component, OnInit } from '@angular/core';
import { IHabilidad } from 'src/app/interfaces/IHabilidades';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
@Component({
  selector: 'app-habilidades-fuertes',
  templateUrl: './habilidades-fuertes.component.html',
  styleUrls: ['./habilidades-fuertes.component.css']
})
export class HabilidadesFuertesComponent implements OnInit {
  listaHabilidadesFuertes:IHabilidad[]=[];
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosHabilidadesFuertes().subscribe(habilidades => {
      this.listaHabilidadesFuertes=habilidades;
    });
  }
  deleteHabilidadFuerte(habilidad:IHabilidad) {
    this.datosPortfolio.deleteHabilidadFuerte(habilidad).subscribe(() =>{
      this.listaHabilidadesFuertes=this.listaHabilidadesFuertes.filter(t=>t.id !==habilidad.id)
    })
  }
  editHabilidadFuerte(habilidad:IHabilidad) {
    this.datosPortfolio.editHabilidadFuerte(habilidad).subscribe(()=>{
      this.listaHabilidadesFuertes[habilidad.id]=habilidad;
    })
  }

  crearHabilidadFuerte(habilidad:IHabilidad){
    console.log("en el componente")
    this.datosPortfolio.crearHabilidadFuerte(habilidad).subscribe(habilidad=>{
      this.listaHabilidadesFuertes.push(habilidad);
    })
  }
}

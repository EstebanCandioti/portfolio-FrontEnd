import { Component, OnInit } from '@angular/core';
import { IProyecto } from 'src/app/interfaces/IProyecto';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  listaProyectos:IProyecto[]=[];
  proyecto:IProyecto=this.listaProyectos[0]
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosProyectos().subscribe(proyectos => {
      this.listaProyectos=proyectos;
    });
  }
  deleteProyecto(proyecto:IProyecto){
    console.log("borrando"+proyecto)
    this.datosPortfolio.deleteProyecto(proyecto).subscribe(()=> {
      this.listaProyectos=this.listaProyectos.filter(t=>t.id !== proyecto.id)
    });
  }
  editProyecto(proyecto:IProyecto){
    console.log("editando"+proyecto)
    this.datosPortfolio.editProyecto(proyecto).subscribe(()=>{
      this.listaProyectos[proyecto.id]=proyecto;
    })
  }
  crearProyecto(proyecto:IProyecto){
    this.datosPortfolio.crearProyecto(proyecto).subscribe(()=>{
      this.listaProyectos.push(proyecto);
    })
  }
}

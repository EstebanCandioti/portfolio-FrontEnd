import { Component, OnInit } from '@angular/core';
import { ITecnologia } from 'src/app/interfaces/ITecnologia';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.component.html',
  styleUrls: ['./tecnologias.component.css']
})
export class TecnologiasComponent implements OnInit {
  listaTecnologias:ITecnologia[]=[];
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosTecnologia().subscribe(tecnologias => {
      this.listaTecnologias=tecnologias;
    });
  }

  deleteTecnologia(tecnologia:ITecnologia){
    this.datosPortfolio.deleteTecnologia(tecnologia).subscribe(()=>{
      this.listaTecnologias=this.listaTecnologias.filter(t=>t.id !== tecnologia.id)
    })
  }
  editTecnologia(tecnologia:ITecnologia){
    this.datosPortfolio.editTecnologia(tecnologia).subscribe(()=>{
      this.listaTecnologias[tecnologia.id]=tecnologia;
    })
  }
  crearTecnologia(tecnologia:ITecnologia){
    this.datosPortfolio.crearTecnologia(tecnologia).subscribe(tecnologia=>{
      this.listaTecnologias.push(tecnologia);
    });
  }
}
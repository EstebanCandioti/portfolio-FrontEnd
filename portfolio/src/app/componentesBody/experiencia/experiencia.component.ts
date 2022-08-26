import { Component, OnInit } from '@angular/core';
import { IExperiencia } from 'src/app/interfaces/IExperiencia';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  listaExperiencia:IExperiencia []=[];
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosExperiencia().subscribe(experiencia=>{
      this.listaExperiencia = experiencia;
    });
    }
    
  deleteExperiencia(experiencia:IExperiencia):void {
     this.datosPortfolio.deleteExperiencia(experiencia).subscribe(()=> {
          this.listaExperiencia=this.listaExperiencia.filter(t=>t.id !== experiencia.id);
    })
  }

  editExperiencia(experiencia:IExperiencia):void {
    this.datosPortfolio.editExperiencia(experiencia).subscribe(()=>{
      this.listaExperiencia[experiencia.id]=experiencia;
    })
  }
  crearExperiencia(experiencia:IExperiencia){
    console.log("en el componente")
    this.datosPortfolio.crearExperiencia(experiencia).subscribe(experiencia=>{
      this.listaExperiencia.push(experiencia);
    })
  }
}
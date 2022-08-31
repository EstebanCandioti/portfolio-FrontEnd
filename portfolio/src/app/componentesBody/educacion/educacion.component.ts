import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEducacion } from 'src/app/interfaces/IEducacion';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  //objeto el cual va a contener los datos de JSON
  mostrar:boolean=false;
  listaEducacion:IEducacion[]=[];
  showCrearEducacion: boolean = false;
  subscription?: Subscription;
  constructor(private datosPortfolio:PortfolioService, private dialogService:MatDialog) {
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosEducacion().subscribe(educacion=>{
      this.listaEducacion=educacion;
    });
  }

  deleteEducacion(educacion:IEducacion) {
     this.datosPortfolio.deleteEducacion(educacion).subscribe(()=> {
          this.listaEducacion=this.listaEducacion.filter(t=>t.id !== educacion.id);
    })
  }

  editEducacion(educacion:IEducacion) {
    this.datosPortfolio.editEducacion(educacion).subscribe()
  }

  crearEducacion(educacion:IEducacion){
    console.log("en el componente")
    this.datosPortfolio.crearEducacion(educacion).subscribe(educacion=>{
      this.listaEducacion.push(educacion);
    })
  }

}

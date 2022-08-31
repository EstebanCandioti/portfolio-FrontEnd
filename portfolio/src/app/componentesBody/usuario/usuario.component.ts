import { Component, OnInit } from '@angular/core';
import { IPersona } from 'src/app/interfaces/IPersona';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(private datosPortfolio:PortfolioService) { 
  }

  ngOnInit(): void {

  }

}

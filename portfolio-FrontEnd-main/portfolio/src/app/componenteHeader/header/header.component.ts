import { Component, OnInit } from '@angular/core';
import { IPersona } from 'src/app/interfaces/IPersona';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  persona:IPersona;
  constructor(private auth:AuthService, private datosPortfolio:PortfolioService) {
    this.persona = this.datosPortfolio
    .obtenerPersona()
    .subscribe((persona: IPersona) => {
      this.persona = persona;
    });
   }

  ngOnInit(): void {
  }
  get autenticado():boolean {
    return this.auth.autenticado;
  }
  logout(){
    this.auth.logOut().then(response=>{
      console.log(response)
    }).catch(error=>console.log(error));
    location.reload()
  }
}

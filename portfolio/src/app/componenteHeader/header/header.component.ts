import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }
  get autenticado():boolean {
    return this.auth.autenticado;
  }
  logout(){
    this.auth.logout();
    location.reload()
  }
}

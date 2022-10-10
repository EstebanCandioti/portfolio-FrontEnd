import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componenteHeader/header/header.component';
import { BodyComponent } from './componentesBody/body/body.component';
import { UsuarioComponent } from './componentesBody/usuario/usuario.component';
import { ExperienciaComponent } from './componentesBody/experiencia/experiencia.component';
import { EducacionComponent } from './componentesBody/educacion/educacion.component';
import { HabilidadesDebilesComponent } from './componentesBody/habilidades-debiles/habilidades-debiles.component';
import { HabilidadesFuertesComponent } from './componentesBody/habilidades-fuertes/habilidades-fuertes.component';
import { TecnologiasComponent } from './componentesBody/tecnologias/tecnologias.component';
import { ProyectosComponent } from './componentesBody/proyectos/proyectos.component';
import { LoginComponent } from './loginComponentes/login/login.component';
import { PortfolioService } from './servicios/portfolio.service';
import { InterceptorService } from './servicios/interceptor.service';
import { SortPortOrdenPipe } from './pipes/sort-port-orden.pipe';
import { AcercaDeComponent } from './componentesBody/acerca-de/acerca-de.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { RegisterComponent } from './loginComponentes/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    UsuarioComponent,
    ExperienciaComponent,
    EducacionComponent,
    HabilidadesDebilesComponent,
    HabilidadesFuertesComponent,
    TecnologiasComponent,
    ProyectosComponent,
    LoginComponent,
    SortPortOrdenPipe,
    AcercaDeComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    DragDropModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  providers: [
    PortfolioService,
    {  provide: HTTP_INTERCEPTORS , useClass: InterceptorService , multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';

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
import { LoginComponent } from './login/login.component';
import { CrearEducacionComponent } from './componentesEdicion/crear-educacion/crear-educacion.component';
import { CrearExperienciaComponent } from './componentesEdicion/crear-experiencia/crear-experiencia.component';
import { CrearHabilidadFuerteComponent } from './componentesEdicion/crear-habilidad-fuerte/crear-habilidad-fuerte.component';
import { CrearHabilidadDebilComponent } from './componentesEdicion/crear-habilidad-debil/crear-habilidad-debil.component';
import { CrearTecnologiaComponent } from './componentesEdicion/crear-tecnologia/crear-tecnologia.component';
import { CrearProyectoComponent } from './componentesEdicion/crear-proyecto/crear-proyecto.component';


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
    CrearEducacionComponent,
    CrearHabilidadFuerteComponent,
    CrearExperienciaComponent,
    CrearHabilidadDebilComponent,
    CrearTecnologiaComponent,
    CrearProyectoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

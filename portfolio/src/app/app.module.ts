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
import { AboutComponent } from './componentesBody/about/about.component';
import { ExperienciaComponent } from './componentesBody/experiencia/experiencia.component';
import { EducacionComponent } from './componentesBody/educacion/educacion.component';
import { HabilidadesDebilesComponent } from './componentesBody/habilidades-debiles/habilidades-debiles.component';
import { HabilidadesFuertesComponent } from './componentesBody/habilidades-fuertes/habilidades-fuertes.component';
import { TecnologiasComponent } from './componentesBody/tecnologias/tecnologias.component';
import { ProyectosComponent } from './componentesBody/proyectos/proyectos.component';
import { ItemEducacionComponent } from './componentesItems/item-educacion/item-educacion.component';
import { ItemExperienciaComponent } from './componentesItems/item-experiencia/item-experiencia.component';
import { ItemHabilidadDebilComponent } from './componentesItems/item-habilidad-debil/item-habilidad-debil.component';
import { ItemHabilidadFuerteComponent } from './componentesItems/item-habilidad-fuerte/item-habilidad-fuerte.component';
import { ItemProyectosComponent } from './componentesItems/item-proyectos/item-proyectos.component';
import { ItemTecnologiasComponent } from './componentesItems/item-tecnologias/item-tecnologias.component';
import { LoginComponent } from './login/login.component';
import { BotonBorrarComponent } from './componentesEdicion/boton-borrar/boton-borrar.component';
import { CrearEducacionComponent } from './componentesEdicion/crear-educacion/crear-educacion.component';
import { CrearExperienciaComponent } from './componentesEdicion/crear-experiencia/crear-experiencia.component';
import { CrearHabilidadFuerteComponent } from './componentesEdicion/crear-habilidad-fuerte/crear-habilidad-fuerte.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    UsuarioComponent,
    AboutComponent,
    ExperienciaComponent,
    EducacionComponent,
    HabilidadesDebilesComponent,
    HabilidadesFuertesComponent,
    TecnologiasComponent,
    ProyectosComponent,
    ItemEducacionComponent,
    ItemExperienciaComponent,
    ItemHabilidadDebilComponent,
    ItemHabilidadFuerteComponent,
    ItemProyectosComponent,
    ItemTecnologiasComponent,
    LoginComponent,
    CrearEducacionComponent,
    BotonBorrarComponent,
    CrearHabilidadFuerteComponent,
    CrearExperienciaComponent
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

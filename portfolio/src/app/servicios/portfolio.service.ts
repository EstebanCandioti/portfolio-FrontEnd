import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEducacion } from '../interfaces/IEducacion';
import { IExperiencia } from '../interfaces/IExperiencia';
import { IHabilidad } from '../interfaces/IHabilidades';
import { IPersona } from '../interfaces/IPersona';
import { ITecnologia } from '../interfaces/ITecnologia';
import { IProyecto } from '../interfaces/IProyecto';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrlEducacion: string = 'http://localhost:3000/educacion';
  private apiUrlPersona: string = 'http://localhost:3000/persona';
  private apiUrlExperiencia: string = 'http://localhost:3000/experiencia';
  private apiUrlHabilidadesFuertes: string = 'http://localhost:3000/hardSkills';
  private apiUrlHabilidadesDebiles: string = 'http://localhost:3000/softSkills';
  private apiUrlTecnologia: string = 'http://localhost:3000/tecnologias';
  private apiUrlProyectos: string = 'http://localhost:3000/proyectos';

  constructor(private http: HttpClient) {}
  // --------------------------------------------FUNCIONES GET PARA CADA COMPONENTE BODY-----------------------------------------------------------------------
  obtenerDatosEducacion(): Observable<IEducacion[]> {
    return this.http.get<IEducacion[]>(this.apiUrlEducacion);
  }

  obtenerDatosPersona(): Observable<IPersona> {
    return this.http.get<IPersona>(this.apiUrlPersona);
  }

  obtenerDatosExperiencia(): Observable<IExperiencia[]> {
    return this.http.get<IExperiencia[]>(this.apiUrlExperiencia);
  }

  obtenerDatosHabilidadesFuertes(): Observable<IHabilidad[]> {
    return this.http.get<IHabilidad[]>(this.apiUrlHabilidadesFuertes);
  }

  obtenerDatosHabilidadesDebiles(): Observable<IHabilidad[]> {
    return this.http.get<IHabilidad[]>(this.apiUrlHabilidadesDebiles);
  }

  obtenerDatosTecnologia(): Observable<ITecnologia[]> {
    return this.http.get<ITecnologia[]>(this.apiUrlTecnologia);
  }

  obtenerDatosProyectos(): Observable<IProyecto[]> {
    return this.http.get<IProyecto[]>(this.apiUrlProyectos);
  }

  //------------------------------------------------FUNCIONES DELETE PARA CADA COMPONENTE BODY-----------------------------------------------------------------
  deleteEducacion(educacion: IEducacion): Observable<IEducacion> {
    const url = `${this.apiUrlEducacion}/${educacion.id}`;
    return this.http.delete<IEducacion>(url);
  }
  deleteExperiencia(experiencia: IExperiencia): Observable<IEducacion> {
    const url = `${this.apiUrlExperiencia}/${experiencia.id}`;
    return this.http.delete<IEducacion>(url);
  }

  deleteHabilidadFuerte(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesFuertes}/${habilidad.id}`;
    return this.http.delete<IHabilidad>(url);
  }

  deleteHabilidadDebil(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesDebiles}/${habilidad.id}`;
    return this.http.delete<IHabilidad>(url);
  }

  deleteTecnologia(tecnologia: ITecnologia): Observable<ITecnologia> {
    const url = `${this.apiUrlTecnologia}/${tecnologia.id}`;
    return this.http.delete<ITecnologia>(url);
  }

  deleteProyecto(proyecto: IProyecto): Observable<IProyecto> {
    const url = `${this.apiUrlProyectos}/${proyecto.id}`;
    return this.http.delete<IProyecto>(url);
  }
  //---------------------------------------------------FUNCIONES EDITAR PARA CADA COMPONENTE BODY------------------------------------------------------------------
  editEducacion(educacion: IEducacion): Observable<IEducacion> {
    const url = `${this.apiUrlEducacion}/${educacion.id}`;
    console.log('el item fue editado' + educacion.institucion);
    return this.http.post<IEducacion>(url, educacion);
  }

  editExperiencia(experiencia: IExperiencia): Observable<IEducacion> {
    const url = `${this.apiUrlExperiencia}/${experiencia.id}`;
    console.log('el item fue editado' + experiencia.nombreTrabajo);
    return this.http.post<IEducacion>(url, experiencia);
  }

  editHabilidadFuerte(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesFuertes}/${habilidad.id}`;
    console.log('el item fue editado' + habilidad.habilidad);
    return this.http.post<IHabilidad>(url, habilidad);
  }
  editHabilidadDebil(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesDebiles}/${habilidad.id}`;
    console.log('el item fue editado' + habilidad.habilidad);
    return this.http.post<IHabilidad>(url, habilidad);
  }
  editTecnologia(tecnologia: ITecnologia): Observable<ITecnologia> {
    const url = `${this.apiUrlTecnologia}/${tecnologia.id}`;
    console.log('el item fue editado' + tecnologia.nombre);
    return this.http.post<ITecnologia>(url, tecnologia);
  }
  editProyecto(proyecto: IProyecto): Observable<IProyecto> {
    const url = `${this.apiUrlProyectos}/${proyecto.id}`;
    console.log('el item fue editado' + proyecto.nombre);
    return this.http.post<IProyecto>(url, proyecto);
  }

  //----------------------------------------------------------------FUNCIONES CREAR PARA CADA COMPONENTE BODY------------------------------------------------------

  crearEducacion(educacion: IEducacion): Observable<IEducacion> {
    return this.http.post<IEducacion>(this.apiUrlEducacion, educacion);
  }
  crearExperiencia(experiencia: IExperiencia): Observable<IExperiencia> {
    return this.http.post<IExperiencia>(this.apiUrlExperiencia, experiencia);
  }
  crearHabilidadFuerte(habilidad: IHabilidad): Observable<IHabilidad> {
    return this.http.post<IHabilidad>(this.apiUrlHabilidadesFuertes, habilidad);
  }
  crearHabilidadDebil(habilidad: IHabilidad): Observable<IHabilidad> {
    return this.http.post<IHabilidad>(this.apiUrlHabilidadesDebiles, habilidad);
  }
  crearTecnologia(tecnologia: ITecnologia): Observable<ITecnologia> {
    return this.http.post<ITecnologia>(this.apiUrlTecnologia, tecnologia);
  }
  crearProyecto(proyecto: IProyecto): Observable<IProyecto> {
    return this.http.post<IProyecto>(this.apiUrlProyectos, proyecto);
  }

  //----------------------------------------------------------------FUNCIONES BUSCAR PARA CADA COMPONENTE BODY------------------------------------------------------

  buscarEducacion():Observable<IEducacion> {
    return this.http.get<IEducacion>("http://localhost:3000/educacion/1");
  }
  buscarProyecto(id: number):Observable<IProyecto> {
    const url = `"http://localhost:3000/proyectos/${id}"`;
    return this.http.get<IProyecto>(url);
  }
}

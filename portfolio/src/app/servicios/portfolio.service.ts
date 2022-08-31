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
  private apiUrlEducacion: string = 'http://localhost:8080/educacion';
  private apiUrlPersona: string = 'http://localhost:8080/persona/';
  private apiUrlExperiencia: string = 'http://localhost:8080/experiencia';
  private apiUrlHabilidadesFuertes: string = 'http://localhost:8080/habilidad-fuerte';
  private apiUrlHabilidadesDebiles: string = 'http://localhost:8080/habilidad-debil';
  private apiUrlTecnologia: string = 'http://localhost:8080/tecnologia';
  private apiUrlProyectos: string = 'http://localhost:8080/proyecto';

  constructor(private http: HttpClient) {}
  // --------------------------------------------FUNCIONES GET PARA CADA COMPONENTE BODY-----------------------------------------------------------------------
  obtenerDatosEducacion(): Observable<IEducacion[]> {
    const url= `${this.apiUrlPersona}1/educacion`
    return this.http.get<IEducacion[]>(url);
  }

  obtenerDatosPersona(): Observable<IPersona> {
    const url= `${this.apiUrlPersona}buscar/1`
    return this.http.get<IPersona>(url);
  }

  obtenerDatosExperiencia(): Observable<IExperiencia[]> {
    const url= `${this.apiUrlPersona}1/experiencia`
    return this.http.get<IExperiencia[]>(url);
  }

  obtenerDatosHabilidadesFuertes(): Observable<IHabilidad[]> {
    const url= `${this.apiUrlPersona}1/habilidad-fuerte`
    return this.http.get<IHabilidad[]>(url);
  }

  obtenerDatosHabilidadesDebiles(): Observable<IHabilidad[]> {
    const url= `${this.apiUrlPersona}1/habilidad-debil`
    return this.http.get<IHabilidad[]>(url);
  }

  obtenerDatosTecnologia(): Observable<ITecnologia[]> {
    const url= `${this.apiUrlPersona}1/tecnologia`
    return this.http.get<ITecnologia[]>(url);
  }

  obtenerDatosProyectos(): Observable<IProyecto[]> {
    const url= `${this.apiUrlPersona}1/proyecto`
    return this.http.get<IProyecto[]>(url);
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

  buscarEducacion(educacion:IEducacion):Observable<IEducacion> {
    const url = `${this.apiUrlEducacion}/buscar/${educacion.id}`;
    return this.http.get<IEducacion>(url);
  }
  buscarProyecto(id: number):Observable<IProyecto> {
    const url = `"http://localhost:3000/proyectos/${id}"`;
    return this.http.get<IProyecto>(url);
  }
}

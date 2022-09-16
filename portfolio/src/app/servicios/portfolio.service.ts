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
  private apiUrlPersona: string = 'http://localhost:8080/persona';
  private apiUrlExperiencia: string = 'http://localhost:8080/experiencia';
  private apiUrlHabilidadesFuertes: string = 'http://localhost:8080/habilidad-fuerte';
  private apiUrlHabilidadesDebiles: string = 'http://localhost:8080/habilidad-debil';
  private apiUrlTecnologia: string = 'http://localhost:8080/tecnologia';
  private apiUrlProyectos: string = 'http://localhost:8080/proyecto';

  constructor(private http: HttpClient) {
    console.log("portfolio service initialized 1")
  }
  // --------------------------------------------FUNCIONES GET PARA CADA COMPONENTE BODY-----------------------------------------------------------------------
  obtenerPersona():any{
    const url = `${this.apiUrlPersona}/buscar/1`
    return this.http.get<any>(url)
  }

  obtenerDatosEducacion(): Observable<IEducacion[]> {
    const url= `${this.apiUrlPersona}/1/educacion`
    return this.http.get<IEducacion[]>(url);
  }

  obtenerDatosExperiencia(): Observable<IExperiencia[]> {
    const url= `${this.apiUrlPersona}/1/experiencia`
    return this.http.get<IExperiencia[]>(url);
  }

  obtenerDatosHabilidadesFuertes(): Observable<IHabilidad[]> {
    const url= `${this.apiUrlPersona}/1/habilidad-fuerte`
    return this.http.get<IHabilidad[]>(url);
  }

  obtenerDatosHabilidadesDebiles(): Observable<IHabilidad[]> {
    const url= `${this.apiUrlPersona}/1/habilidad-debil`
    return this.http.get<IHabilidad[]>(url);
  }

  obtenerDatosTecnologia(): Observable<ITecnologia[]> {
    const url= `${this.apiUrlPersona}/1/tecnologia`
    return this.http.get<ITecnologia[]>(url);
  }

  obtenerDatosProyectos(): Observable<IProyecto[]> {
    const url= `${this.apiUrlPersona}/1/proyecto`
    return this.http.get<IProyecto[]>(url);
  }

  //------------------------------------------------FUNCIONES DELETE PARA CADA COMPONENTE BODY-----------------------------------------------------------------
  deleteEducacion(educacion: IEducacion): Observable<IEducacion> {
    const url = `${this.apiUrlEducacion}/borrar/${educacion.id}`;
    return this.http.delete<IEducacion>(url);
  }
  deleteExperiencia(experiencia: IExperiencia): Observable<IEducacion> {
    const url = `${this.apiUrlExperiencia}/borrar/${experiencia.id}`;
    return this.http.delete<IEducacion>(url);
  }

  deleteHabilidadFuerte(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesFuertes}/borrar/${habilidad.id}`;
    return this.http.delete<IHabilidad>(url);
  }

  deleteHabilidadDebil(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesDebiles}/borrar/${habilidad.id}`;
    return this.http.delete<IHabilidad>(url);
  }

  deleteTecnologia(tecnologia: ITecnologia): Observable<ITecnologia> {
    const url = `${this.apiUrlTecnologia}/borrar/${tecnologia.id}`;
    return this.http.delete<ITecnologia>(url);
  }

  deleteProyecto(proyecto: IProyecto): Observable<IProyecto> {
    const url = `${this.apiUrlProyectos}/borrar/${proyecto.id}`;
    return this.http.delete<IProyecto>(url);
  }
  //---------------------------------------------------FUNCIONES EDITAR PARA CADA COMPONENTE BODY------------------------------------------------------------------
//----------------------------------------PERSONA---------------------------------------------
  editPersona(persona: IPersona): Observable<IPersona> {
    const url = `${this.apiUrlPersona}/editar`
    return this.http.post<IPersona>(url,persona);
  }
//---------------------------------EDUCACION-----------------------
  editEducacion(educacion: IEducacion): Observable<IEducacion> {
    const url = `${this.apiUrlEducacion}/editar`;
    console.log('el item fue editado' + educacion.institucion);
    return this.http.post<IEducacion>(url, educacion);
  }
//----------------------------- EXPERIENCIA ----------------------------------
  editExperiencia(experiencia: IExperiencia): Observable<IEducacion> {
    const url = `${this.apiUrlExperiencia}/editar`;
    console.log('el item fue editado' + experiencia.nombreTrabajo);
    return this.http.post<IEducacion>(url, experiencia);
  }
  //---------------------- HABILIDAD FUERTE ----------------------------------
  editHabilidadFuerte(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesFuertes}/editar`;
    console.log('el item fue editado' + habilidad.habilidad);
    return this.http.post<IHabilidad>(url, habilidad);
  }
//--------------------- HABILIDAD DEBIL-----------------------------------
  editHabilidadDebil(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesDebiles}/editar`;
    console.log('el item fue editado' + habilidad.habilidad);
    return this.http.post<IHabilidad>(url, habilidad);
  }
//----------------------- TECNOLOGIA ------------------------------------
  editTecnologia(tecnologia: ITecnologia): Observable<ITecnologia> {
    const url = `${this.apiUrlTecnologia}/editar`;
    console.log('el item fue editado' + tecnologia.nombre);
    return this.http.post<ITecnologia>(url, tecnologia);
  }
//----------------------- PROYECTO --------------------------------------
  editProyecto(proyecto: IProyecto): Observable<IProyecto> {
    const url = `${this.apiUrlProyectos}/editar`;
    console.log('el item fue editado' + proyecto.nombre);
    return this.http.post<IProyecto>(url, proyecto);
  }

  //----------------------------------------------------------------FUNCIONES CREAR PARA CADA COMPONENTE BODY------------------------------------------------------

  crearEducacion(educacion: IEducacion): Observable<IEducacion> {
    const url = `${this.apiUrlEducacion}/crear`;
    return this.http.post<IEducacion>(url, educacion);
  }
  crearExperiencia(experiencia: IExperiencia): Observable<IExperiencia> {
    const url = `${this.apiUrlExperiencia}/crear`;
    return this.http.post<IExperiencia>(url, experiencia);
  }
  crearHabilidadFuerte(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesFuertes}/crear`;
    return this.http.post<IHabilidad>(url, habilidad);
  }
  crearHabilidadDebil(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesDebiles}/crear`;
    return this.http.post<IHabilidad>(url, habilidad);
  }
  crearTecnologia(tecnologia: ITecnologia): Observable<ITecnologia> {
    const url = `${this.apiUrlTecnologia}/crear`;
    return this.http.post<ITecnologia>(url, tecnologia);
  }
  crearProyecto(proyecto: IProyecto): Observable<IProyecto> {
    const url = `${this.apiUrlProyectos}/crear`;
    return this.http.post<IProyecto>(url, proyecto);
  }

  //----------------------------------------------------------------FUNCIONES BUSCAR PARA CADA COMPONENTE BODY------------------------------------------------------

  buscarEducacion(educacion:IEducacion):Observable<IEducacion> {
    const url = `${this.apiUrlEducacion}/buscar/${educacion.id}`;
    return this.http.get<IEducacion>(url);
  }
  buscarExperiencia(experiencia:IExperiencia):Observable<IExperiencia>{
    const url = `${this.apiUrlExperiencia}/buscar/${experiencia.id}`;
    return this.http.get<IExperiencia>(url);
  }
  buscarProyecto(proyecto:IProyecto):Observable<IProyecto> {
    const url = `${this.apiUrlProyectos}/buscar/${proyecto.id}`;
    return this.http.get<IProyecto>(url);
  }
  buscarHabilidadDebil(habilidad:IHabilidad):Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesDebiles}/buscar/${habilidad.id}`;
    return this.http.get<IHabilidad>(url);
  }
  buscarHabilidadFuerte(habilidad:IHabilidad):Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesFuertes}/buscar/${habilidad.id}`;
    return this.http.get<IHabilidad>(url);
  }
  buscarTecnologia(tecnologia:ITecnologia):Observable<ITecnologia> {
    const url = `${this.apiUrlTecnologia}/buscar/${tecnologia.id}`;
    return this.http.get<ITecnologia>(url);
  }
}

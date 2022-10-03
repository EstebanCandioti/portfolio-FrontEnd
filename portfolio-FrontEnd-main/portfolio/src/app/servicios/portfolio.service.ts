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
  private apiUrlEducacion: string = 'https://backend-esteban-candioti.herokuapp.com/educacion';
  private apiUrlPersona: string = 'https://backend-esteban-candioti.herokuapp.com/persona';
  private apiUrlExperiencia: string = 'https://backend-esteban-candioti.herokuapp.com/experiencia';
  private apiUrlHabilidadesFuertes: string = 'https://backend-esteban-candioti.herokuapp.com/habilidad-fuerte';
  private apiUrlHabilidadesDebiles: string = 'https://backend-esteban-candioti.herokuapp.com/habilidad-debil';
  private apiUrlTecnologia: string = 'https://backend-esteban-candioti.herokuapp.com/tecnologia';
  private apiUrlProyectos: string = 'https://backend-esteban-candioti.herokuapp.com/proyecto';
  private apiUrlLogin: string = 'https://backend-esteban-candioti.herokuapp.com/api/login';

  constructor(private http: HttpClient) {
    console.log("portfolio service initialized 1")
  }

  //----------------------------------------------PETICIONES COMPONENTE EDUCACION------------------------------------------------------------------------------
  
  obtenerDatosEducacion(): Observable<IEducacion[]> {
    const url= `${this.apiUrlPersona}/1/educacion`
    return this.http.get<IEducacion[]>(url);
  }

  deleteEducacion(educacion: IEducacion): Observable<IEducacion> {
    const url = `${this.apiUrlEducacion}/borrar/${educacion.id}`;
    return this.http.delete<IEducacion>(url);
  }

  editEducacion(educacion: IEducacion): Observable<IEducacion> {
    const url = `${this.apiUrlEducacion}/editar`;
    console.log('el item fue editado' + educacion.institucion);
    return this.http.post<IEducacion>(url, educacion);
  }

  crearEducacion(educacion: IEducacion): Observable<IEducacion> {
    const url = `${this.apiUrlEducacion}/crear`;
    return this.http.post<IEducacion>(url, educacion);
  }
  //----------------------------------------------PETICION COMPONENTE EXPERIENCIA---------------------------------------------------------------------------
  obtenerDatosExperiencia(): Observable<IExperiencia[]> {
    const url= `${this.apiUrlPersona}/1/experiencia`
    return this.http.get<IExperiencia[]>(url);
  }

  deleteExperiencia(experiencia: IExperiencia): Observable<IExperiencia> {
    const url = `${this.apiUrlExperiencia}/borrar/${experiencia.id}`;
    return this.http.delete<IExperiencia>(url);
  }

  editExperiencia(experiencia: IExperiencia): Observable<IExperiencia> {
    const url = `${this.apiUrlExperiencia}/crear`;
    console.log('el item fue editado', experiencia);
    return this.http.post<IExperiencia>(url, experiencia);
  }

  crearExperiencia(experiencia: IExperiencia): Observable<IExperiencia> {
    const url = `${this.apiUrlExperiencia}/crear`;
    return this.http.post<IExperiencia>(url, experiencia);
  }

  //-------------------------------------------------METODOS COMPONENTE HABILDIDAD FUERTE-----------------------------------------------------------------------

  deleteHabilidadFuerte(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesFuertes}/borrar/${habilidad.id}`;
    return this.http.delete<IHabilidad>(url);
  }

  editHabilidadFuerte(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesFuertes}/editar`;
    console.log('el item fue editado' + habilidad.habilidad);
    return this.http.post<IHabilidad>(url, habilidad);
  }

  crearHabilidadFuerte(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesFuertes}/crear`;
    return this.http.post<IHabilidad>(url, habilidad);
  }

  obtenerDatosHabilidadesFuertes(): Observable<IHabilidad[]> {
    const url= `${this.apiUrlPersona}/1/habilidad-fuerte`
    return this.http.get<IHabilidad[]>(url);
  }

  //----------------------------------------------------------METODOS COMPONENTE HABILIDAD DEBIL------------------------------------------------------------
  
  deleteHabilidadDebil(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesDebiles}/borrar/${habilidad.id}`;
    return this.http.delete<IHabilidad>(url);
  }

  editHabilidadDebil(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesDebiles}/editar`;
    console.log('el item fue editado' + habilidad.habilidad);
    return this.http.post<IHabilidad>(url, habilidad);
  }

  crearHabilidadDebil(habilidad: IHabilidad): Observable<IHabilidad> {
    const url = `${this.apiUrlHabilidadesDebiles}/crear`;
    return this.http.post<IHabilidad>(url, habilidad);
  }

  obtenerDatosHabilidadesDebiles(): Observable<IHabilidad[]> {
    const url= `${this.apiUrlPersona}/1/habilidad-debil`
    return this.http.get<IHabilidad[]>(url);
  }
  //----------------------------------------------------METODOS COMPONENTE TECNOLOGIA----------------------------------------------------------------------------

  deleteTecnologia(tecnologia: ITecnologia): Observable<ITecnologia> {
    const url = `${this.apiUrlTecnologia}/borrar/${tecnologia.id}`;
    return this.http.delete<ITecnologia>(url);
  }

  editTecnologia(tecnologia: ITecnologia): Observable<ITecnologia> {
    const url = `${this.apiUrlTecnologia}/editar`;
    console.log('el item fue editado' + tecnologia.nombre);
    return this.http.post<ITecnologia>(url, tecnologia);
  }
  
  crearTecnologia(tecnologia: ITecnologia): Observable<ITecnologia> {
    const url = `${this.apiUrlTecnologia}/crear`;
    return this.http.post<ITecnologia>(url, tecnologia);
  }

  obtenerDatosTecnologia(): Observable<ITecnologia[]> {
    const url= `${this.apiUrlPersona}/1/tecnologia`
    return this.http.get<ITecnologia[]>(url);
  }

  //----------------------------------------------------METODOS COMPONENTE PROYECTOS-------------------------------------------------------------

  deleteProyecto(proyecto: IProyecto): Observable<IProyecto> {
    const url = `${this.apiUrlProyectos}/borrar/${proyecto.id}`;
    return this.http.delete<IProyecto>(url);
  }

  editProyecto(proyecto: IProyecto): Observable<IProyecto> {
    const url = `${this.apiUrlProyectos}/editar`;
    console.log('el item fue editado' + proyecto.nombre);
    return this.http.post<IProyecto>(url, proyecto);
  }

  crearProyecto(proyecto: IProyecto): Observable<IProyecto> {
    const url = `${this.apiUrlProyectos}/crear`;
    return this.http.post<IProyecto>(url, proyecto);
  }

  obtenerDatosProyectos(): Observable<IProyecto[]> {
    const url= `${this.apiUrlPersona}/1/proyecto`
    return this.http.get<IProyecto[]>(url);
  }

//--------------------------------------------------METODOS COMPONENTE PERSONA--------------------------------------------------
  editPersona(persona: IPersona): Observable<IPersona> {
    const url = `${this.apiUrlPersona}/editar`
    return this.http.post<IPersona>(url,persona);
  }

  obtenerPersona():any{
    const url = `${this.apiUrlPersona}/buscar/1`
    return this.http.get<any>(url)
  }


  //--------------------------------------------- OTROS --------------------------------------------------------
  contadorPosiciones(lista: any): number {
    let posiciones: number = 0;
    for (let i = 0; i < lista.length; i++) {
      if (lista[i].posicion > posiciones) {
        posiciones = lista[i].posicion;
      }
    }
    return posiciones;
  }

  login(credenciales:any):Observable<any>{
    return this.http.post<any>(this.apiUrlLogin, credenciales )
  }
}

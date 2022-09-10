import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // url="http://locahost:8080/api/services/autentication";

  url = "./assets/data/tokenOk.json";
  urlError = "./assets/data/tokenError.json";

  currentUserSubject: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem("currentUser") || "{}")
    );
  }
  iniciarSesion(credenciales: any): Observable<any> {
    if (
      credenciales.email == "estebancandio@gmail.com" &&
      credenciales.password == "YoProgramo2"
    ) {
      return this.http.get(this.url, credenciales).pipe(
        map((data) => {
          console.log("respuesta aceptada");
          sessionStorage.setItem("currentUser", JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        })
      );
    } else {
      return this.http.get(this.urlError, credenciales).pipe(
        map((data) => {
          console.log("respuesta denegada");
          sessionStorage.setItem("currentUser", JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        })
      );
    }
  }

  logout() {
    // puede que por el tipo de aplicación requiera notificar al backend el logout
    // ej. expirar el token
    sessionStorage.removeItem("currentUser");
    this.currentUserSubject.next({});
  }

  get autenticado(): boolean {
    return this.currentUserSubject.getValue().displayName != null;
  }
  get usuario(): any {
    return this.currentUserSubject.getValue();
  }
}

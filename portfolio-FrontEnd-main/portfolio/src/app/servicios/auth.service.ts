import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //    url="https://backend-esteban-candioti.herokuapp.com/api/login";

  url = './assets/data/tokenOk.json';
  urlError = './assets/data/tokenError.json';
  email: string = 'estebancandio@gmail.com';
  contrasenia: string = 'YoProgramo2';

  currentUserSubject: BehaviorSubject<any>;
  constructor(private http: HttpClient, private auth:Auth) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
    console.log('auth service initialized');
  }
  iniciarSesion(credenciales: any): Observable<any> {
    if (
      credenciales.email != this.email &&
      credenciales.contrasenia != this.contrasenia
    ) {
      return this.http.get(this.urlError, credenciales).pipe(
        map((data) => {
          console.log('credenciales invalidas');
          sessionStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        })
      );
    } else {
      return this.http.get(this.url, credenciales).pipe(
        map((data) => {
          console.log('respuesta aceptada');
          sessionStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        })
      );
    }
  }

  /*
  logout() {
    // puede que por el tipo de aplicación requiera notificar al backend el logout
    // ej. expirar el token
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next({});
  }
  */

  get autenticado(): boolean {
    return this.currentUserSubject.getValue().user!= null;
  }
  get usuario(): any {
    return this.currentUserSubject.getValue();
  }

  
  //---------------------------------------------FUNCIONES CON FIREBASE----------------------------------------------------
  register(email: string, password: string){
      return createUserWithEmailAndPassword(this.auth,email,password)
  }

  logIn(email: string, password: string){
    return signInWithEmailAndPassword(this.auth,email,password).then((data) => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        return data;})
  }

  logOut(){
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next({});
    return signOut(this.auth)
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{


  constructor( private auth : AuthService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    throw new Error('Method not implemented.');
    /*
    var currentUser = this.auth.usuario;

    if ( currentUser && currentUser.accessToken!=null ) {
      req = req.clone({
        setHeaders:{ Authorization: 'Bearer ' + currentUser.accessToken}
      });
    }
    console.log(req);
    return next.handle(req);
    */
  }
}

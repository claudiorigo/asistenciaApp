import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  };
  constructor(private http: HttpClient) { }
  //Traer lista JSON de Usuarios desde web
  getUsuarios():Observable<any>{
    return this.http.get(environment.apiUrl + '/users/').pipe(
      retry(3)
    );
  }
  //Traer lista JSON de Docentes desde web
  getDocentes():Observable<any>{
    return this.http.get(environment.apiUrl + '/docente/').pipe(
      retry(3)
    );
  }
}

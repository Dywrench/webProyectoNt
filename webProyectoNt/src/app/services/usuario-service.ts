import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUri = '/api/usuarios';

  httpOptions = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUri);
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get(`${this.apiUri}/${id}`);
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUri, usuario, {
      headers: this.httpOptions
    });
  }

  updateUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUri}/${id}`, usuario, {
      headers: this.httpOptions
    });
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUri}/${id}`);
  }
}

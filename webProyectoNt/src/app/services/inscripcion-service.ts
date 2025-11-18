import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  apiUri = '/api/inscripciones';

  httpOptions = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(private http: HttpClient) {}

  getInscripciones(): Observable<any> {
    return this.http.get(this.apiUri);
  }

  getInscripcion(id: string): Observable<any> {
    return this.http.get(`${this.apiUri}/${id}`);
  }

  createInscripcion(ins: any): Observable<any> {
    return this.http.post(this.apiUri, ins, {
      headers: this.httpOptions
    });
  }

  updateInscripcion(id: string, ins: any): Observable<any> {
    return this.http.put(`${this.apiUri}/${id}`, ins, {
      headers: this.httpOptions
    });
  }

  deleteInscripcion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUri}/${id}`);
  }
}

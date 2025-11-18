import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  apiUri = '/api/eventos';

  httpOptions = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(private http: HttpClient) {}

  getEventos(): Observable<any> {
    return this.http.get(this.apiUri);
  }

  getEvento(id: string): Observable<any> {
    return this.http.get(`${this.apiUri}/${id}`);
  }

  createEvento(evento: any): Observable<any> {
    return this.http.post(this.apiUri, evento, {
      headers: this.httpOptions
    });
  }

  updateEvento(id: string, evento: any): Observable<any> {
    return this.http.put(`${this.apiUri}/${id}`, evento, {
      headers: this.httpOptions
    });
  }

  deleteEvento(id: string): Observable<any> {
    return this.http.delete(`${this.apiUri}/${id}`);
  }
}

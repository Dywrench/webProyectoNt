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

  getEventos() {
    return this.http.get(this.apiUri);
  }

  getEvento(id: string) {
    return this.http.get(`${this.apiUri}/${id}`);
  }

  createEvento(evento: any) {
    return this.http.post(this.apiUri, evento, {
      headers: this.httpOptions
    });
  }

  updateEvento(id: string, evento: any) {
    return this.http.put(`${this.apiUri}/${id}`, evento, {
      headers: this.httpOptions
    });
  }

  deleteEvento(id: string) {
    return this.http.delete(`${this.apiUri}/${id}`);
  }
}

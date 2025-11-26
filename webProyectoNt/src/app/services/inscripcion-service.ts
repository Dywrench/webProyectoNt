import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  apiUri = '/api/inscripciones';

  httpOptions = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(private http: HttpClient, private authService: AuthService) {}

  getInscripciones() {
    return this.http.get(this.apiUri);
  }

  createInscripcionParaEvento(eventoId: string) {
    const usuarioId = this.authService.getUserId();

    const body = {
      usuario: usuarioId,
      evento: eventoId
    };

    return this.http.post(this.apiUri, body, {
      headers: this.httpOptions
    });
  }

  getInscripcion(id: string) {
    return this.http.get(`${this.apiUri}/${id}`);
  }

  createInscripcion(ins: any) {
    return this.http.post(this.apiUri, ins, {
      headers: this.httpOptions
    });
  }

  updateInscripcion(id: string, ins: any) {
    return this.http.put(`${this.apiUri}/${id}`, ins, {
      headers: this.httpOptions
    });
  }

  deleteInscripcion(id: string) {
    return this.http.delete(`${this.apiUri}/${id}`);
  }
}

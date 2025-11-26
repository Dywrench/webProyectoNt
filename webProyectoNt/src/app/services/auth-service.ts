import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUri = '/api/usuarios';

  private currentUser: any = null;
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string) {
    return this.http.post<any>(`${this.apiUri}/login`, {
      correo,
      contraseña: contrasena
    });
  }

  setSession(user: any, token: string): void {
    this.currentUser = user;
    this.token = token;
    localStorage.setItem('auth_user', JSON.stringify(user));
    localStorage.setItem('auth_token', token);
  }

  loadSessionFromStorage(): void {
    const storedUser = localStorage.getItem('auth_user');
    const storedToken = localStorage.getItem('auth_token');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    this.token = storedToken ?? null;
  }

  getUserId(): string | null {
    return this.currentUser && this.currentUser._id ? this.currentUser._id : null;
  }

  logout(): void {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  }
}

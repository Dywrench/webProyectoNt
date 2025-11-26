import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-usuario-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-component.html',
  styleUrl: './usuario-component.css',
})
export class UsuarioComponent implements OnInit {

  nombreUsuario: string = '';
  rolUsuario: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loadSessionFromStorage();
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.nombreUsuario = `${user.nombre} ${user.apellido}`;
      this.rolUsuario = user.rol;
    }
  }

  irAEventos(): void {
    this.router.navigate(['/eventos']);
  }

  irAMisInscripciones(): void {
    this.router.navigate(['/mis-inscripciones']);
  }

  irAAdminEventos(): void {
    this.router.navigate(['/admin/eventos']);
  }

  irACrearEvento(): void {
    this.router.navigate(['/admin/eventos/nuevo']);
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

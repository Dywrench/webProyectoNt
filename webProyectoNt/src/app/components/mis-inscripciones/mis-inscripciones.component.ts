import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InscripcionService } from '../../services/inscripcion-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-mis-inscripciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-inscripciones.component.html',
  styleUrls: ['./mis-inscripciones.component.css']
})
export class MisInscripcionesComponent implements OnInit {

  inscripciones: any[] = [];
  cargando: boolean = false;
  error: string = '';

  constructor(
    private inscripcionService: InscripcionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarMisInscripciones();
  }

  cargarMisInscripciones(): void {
    this.cargando = true;
    this.authService.loadSessionFromStorage();
    const userId = this.authService.getUserId();

    if (!userId) {
      this.error = 'No se encontró información del usuario logueado.';
      this.cargando = false;
      return;
    }

    this.inscripcionService.getInscripciones().subscribe({
      next: (res: any) => {
        // La API devuelve inscripciones con usuario y evento populados
        this.inscripciones = (res as any[]).filter((i) => {
          const usuario = i.usuario && (i.usuario._id || i.usuario);
          return usuario === userId;
        });
        this.cargando = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar las inscripciones.';
        console.error(err);
        this.cargando = false;
      }
    });
  }

  cancelarInscripcion(inscripcion: any): void {
    if (!confirm('¿Seguro que deseas cancelar esta inscripción?')) {
      return;
    }

    const id = inscripcion._id;

    this.inscripcionService.updateInscripcion(id, {
      estado: 'cancelada'
    }).subscribe({
      next: () => {
        this.cargarMisInscripciones();
      },
      error: (err: any) => {
        alert('Error al cancelar la inscripción');
        console.error(err);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventoService } from '../../services/evento-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {

  modoEdicion = false;
  eventoId: string | null = null;

  nombre = '';
  descripcion = '';
  fecha = '';
  horaInicio = '';
  horaFin = '';
  lugar = '';
  categoria = '';
  capacidad: number | null = null;

  error = '';

  categorias = ['académico', 'cultural', 'deportivo', 'social'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.eventoId = this.route.snapshot.paramMap.get('id');
    this.modoEdicion = !!this.eventoId;

    if (this.modoEdicion && this.eventoId) {
      this.cargarEvento(this.eventoId);
    }
  }

  cargarEvento(id: string): void {
    this.eventoService.getEvento(id).subscribe({
      next: (e: any) => {
        this.nombre = e.nombre;
        this.descripcion = e.descripcion;
        this.fecha = e.fecha ? e.fecha.substring(0, 10) : '';
        this.horaInicio = e.horaInicio;
        this.horaFin = e.horaFin;
        this.lugar = e.lugar;
        this.categoria = e.categoria;
        this.capacidad = e.capacidad;
      },
      error: (err: any) => {
        this.error = 'Error al cargar el evento.';
        console.error(err);
      }
    });
  }

  guardar(): void {
    this.error = '';

    this.authService.loadSessionFromStorage();
    const userId = this.authService.getUserId();
    if (!userId) {
      this.error = 'No se encontró el usuario organizador.';
      return;
    }

    const body: any = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      fecha: this.fecha,
      horaInicio: this.horaInicio,
      lugar: this.lugar,
      categoria: this.categoria,
      capacidad: this.capacidad,
      organizador: userId
    };

    if (this.horaFin) {
      body.horaFin = this.horaFin;
    }

    if (this.modoEdicion && this.eventoId) {
      this.eventoService.updateEvento(this.eventoId, body).subscribe({
        next: () => {
          this.router.navigate(['/admin/eventos']);
        },
        error: (err: any) => {
          this.error = 'Error al actualizar el evento.';
          console.error(err);
        }
      });
    } else {
      this.eventoService.createEvento(body).subscribe({
        next: () => {
          this.router.navigate(['/admin/eventos']);
        },
        error: (err: any) => {
          this.error = 'Error al crear el evento.';
          console.error(err);
        }
      });
    }
  }
}

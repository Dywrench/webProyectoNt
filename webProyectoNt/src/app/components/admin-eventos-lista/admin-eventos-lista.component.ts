import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EventoService } from '../../services/evento-service';

@Component({
  selector: 'app-admin-eventos-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-eventos-lista.component.html',
  styleUrls: ['./admin-eventos-lista.component.css']
})
export class AdminEventosListaComponent implements OnInit {

  eventos: any[] = [];
  cargando = false;
  error = '';

  constructor(private eventoService: EventoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.cargando = true;
    this.eventoService.getEventos().subscribe({
      next: (res: any) => {
        this.eventos = res;
        this.cargando = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar los eventos';
        console.error(err);
        this.cargando = false;
      }
    });
  }

  irACrear(): void {
    this.router.navigate(['/admin/eventos/nuevo']);
  }

  editar(id: string): void {
    this.router.navigate(['/admin/eventos', id, 'editar']);
  }

  eliminar(id: string): void {
    if (!confirm('¿Seguro que deseas eliminar este evento?')) {
      return;
    }
    this.eventoService.deleteEvento(id).subscribe({
      next: () => {
        this.cargarEventos();
      },
      error: (err: any) => {
        alert('Error al eliminar el evento');
        console.error(err);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventoService } from '../../services/evento-service';
import { InscripcionService } from '../../services/inscripcion-service';

@Component({
  selector: 'app-eventos-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './eventos-lista.component.html',
  styleUrls: ['./eventos-lista.component.css']
})
export class EventosListaComponent implements OnInit {

  eventos: any[] = [];
  cargando: boolean = false;
  error: string = '';

  constructor(
    private eventoService: EventoService,
    private inscripcionService: InscripcionService
  ) {}

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

  inscribirse(eventoId: string): void {
    this.inscripcionService.createInscripcionParaEvento(eventoId).subscribe({
      next: (res: any) => {
        alert('Inscripción creada correctamente');
      },
      error: (err: any) => {
        alert('Error al crear la inscripción');
        console.error(err);
      }
    });
  }
}

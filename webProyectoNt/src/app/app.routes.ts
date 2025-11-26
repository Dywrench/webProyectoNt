import { Routes } from '@angular/router';

import { LoginComponent } from './components/login-component/login-component';
import { UsuarioComponent } from './components/usuario-component/usuario-component';
import { EventosListaComponent } from './components/eventos-lista/eventos-lista.component';
import { MisInscripcionesComponent } from './components/mis-inscripciones/mis-inscripciones.component';
import { AdminEventosListaComponent } from './components/admin-eventos-lista/admin-eventos-lista.component';
import { EventoFormComponent } from './components/evento-form/evento-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'eventos', component: EventosListaComponent },
    { path: 'mis-inscripciones', component: MisInscripcionesComponent },
    { path: 'admin/eventos', component: AdminEventosListaComponent },
    { path: 'admin/eventos/nuevo', component: EventoFormComponent },
    { path: 'admin/eventos/:id/editar', component: EventoFormComponent },
    { path: '**', redirectTo: 'login' }
];

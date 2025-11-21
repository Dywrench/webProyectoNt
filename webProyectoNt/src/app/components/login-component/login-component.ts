import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {

  usuario: string = '';
  password: string = '';

  modalVisible: boolean = false;

  regNombre: string = '';
  regEmail: string = '';
  regUsuario: string = '';
  regPass: string = '';

  constructor(private usuarioService: UsuarioService) {}

  abrirRegistro() {
    this.modalVisible = true;
  }

  cerrarRegistro() {
    this.modalVisible = false;
  }

  registrarUsuario() {
    const data = {
      nombre: this.regNombre,
      correo: this.regEmail,
      usuario: this.regUsuario,
      password: this.regPass
    };

    this.usuarioService.createUsuario(data).subscribe({
      next: (res) => {
        alert("Usuario registrado correctamente");
        this.cerrarRegistro();
      },
      error: (err) => {
        alert("Error al registrar usuario");
        console.error(err);
      }
    });
  }

  login() {
    console.log("Intentando login...", this.usuario, this.password);
  }

}

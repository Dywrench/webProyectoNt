import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

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
  regApellido: string = '';
  regEmail: string = '';
  regUsuario: string = '';
  regPass: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  abrirRegistro() {
    this.modalVisible = true;
  }

  cerrarRegistro() {
    this.modalVisible = false;
  }

  registrarUsuario() {
    const data = {
      nombre: this.regNombre,
      apellido: this.regApellido,
      correo: this.regEmail,
      contraseña: this.regPass
    };

    this.usuarioService.createUsuario(data).subscribe({
      next: (res: unknown) => {
        alert("Usuario registrado correctamente");
        this.cerrarRegistro();
      },
      error: (err: unknown) => {
        alert("Error al registrar usuario");
        console.error(err);
      }
    });
  }

  login() {
    const correo = this.usuario;
    const contrasena = this.password;

    this.authService.login(correo, contrasena).subscribe({
      next: (res: any) => {
        this.authService.setSession(res.usuario, res.token);
        this.router.navigate(['/usuario']);
      },
      error: (err: any) => {
        alert('Error al iniciar sesión');
        console.error(err);
      }
    });
  }

}

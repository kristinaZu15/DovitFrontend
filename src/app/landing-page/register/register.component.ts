import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public usuarioForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      enabled: [true, Validators.required],
      rol: ['', Validators.required]
    });
  }

  registrarUsuario(): void {
    if (this.usuarioForm.valid) {
      const nuevoUsuario: Usuario = this.usuarioForm.value;
      const rolNombre: string = this.usuarioForm.get('rol')?.value;

      // Modifica esta llamada para pasar el nombre del rol
      this.usuarioService.crear(nuevoUsuario, rolNombre).subscribe({
        next: (data) => {
          this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          this.errorMessage = error;
          this.snackBar.open(this.errorMessage, 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}

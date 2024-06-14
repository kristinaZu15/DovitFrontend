import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JwtRequest } from '../../models/jwtRequest';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule 
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const jwtRequest: JwtRequest = { username: this.username, password: this.password };
    this.authService.login(jwtRequest).subscribe({
      next: (token) => {
        this.authService.saveToken(token);
        this.successMessage = 'Inicio de sesión exitosa!';
        this.routeBasedOnRole();
      },
      error: (error) => {
        this.errorMessage = 'username o contraseña invalidos, vuelve a intentarlo';
        console.error('Login error:', error);
      }
    });
  }

  private routeBasedOnRole() {
    const role = this.authService.getUserRole();
    if (role === 'Donante') {
      this.router.navigate(['/home']);
    } else if (role === 'Organizacion') {
      this.router.navigate(['/inicio']);
    } else {
      this.errorMessage = 'Acceso no autorizado';
      this.router.navigate(['/login']);
    }
  }
}
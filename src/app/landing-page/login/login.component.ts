import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../models/jwtRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  username: string = '';
  password: string = '';
  mensaje: string = '';
  ngOnInit(): void {}

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        const role = this.loginService.showRole();
        if (role === 'Donante') {
          this.router.navigate(['about']);
        } else if (role === 'Organizacion') {
          this.router.navigate(['menu']);
        } else {
          this.mensaje = 'Rol desconocido!!!';
          this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
        }
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }

  //para ver contraseña
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('toggleIcon') toggleIcon!: ElementRef<HTMLSpanElement>;

  togglePasswordVisibility() {
    const passwordInput = this.passwordInput.nativeElement;
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';

    const icon = this.toggleIcon.nativeElement;
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
  }
}
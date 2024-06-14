import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../models/jwtRequest';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = `${environment.chBase}/login`;
  private jwtHelper = new JwtHelperService();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuthentication());

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(jwtRequest: JwtRequest) {
    return this.http.post(this.loginUrl, jwtRequest, { responseType: 'text' }).pipe
    (
      tap(token => {
        this.saveToken(token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Método para obtener el rol del usuario desde el token
  getUserRole(): string | null {
    const token = sessionStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken['role'];
    }
    return null;
  }

  // Método para guardar el token en el sessionStorage
  saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  // Método para limpiar el token almacenado al cerrar sesión
  logout() {
    sessionStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  // Método privado para verificar la autenticación al iniciar el servicio
  private checkAuthentication(): boolean {
    const token = sessionStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }
}
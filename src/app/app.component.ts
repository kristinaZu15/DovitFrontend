import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

interface MenuNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DovitFrontend';
  userType: string | null = null;
  isAuthenticated: boolean = false;
  isMenuNavCollapsed = false;
  screenWidth = window.innerWidth;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateAuthenticationState();
  }

  updateAuthenticationState() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.userType = this.authService.getUserRole();
    } else {
      this.userType = null;
    }
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
  
  onToggleMenuNav(data: MenuNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isMenuNavCollapsed = data.collapsed;
  }
}

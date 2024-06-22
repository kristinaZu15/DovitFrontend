import { Component, OnInit } from '@angular/core';

interface MenuNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DovitFrontend';
  
  isMenuNavCollapsed = false;
  screenWidth = window.innerWidth;
  
  onToggleMenuNav(data: MenuNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isMenuNavCollapsed = data.collapsed;
  }
}

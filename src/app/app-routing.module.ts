import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './donor/home/home.component';
import { InicioComponent } from './organizations/inicio/inicio.component';
import { segGuard } from './guard/seguridad.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Rutas para Donante
  { path: 'home', component: HomeComponent },
  {
    path: 'donaciones',
    loadChildren: () => import('./donor/donaciones/donaciones.module').then(m => m.DonacionesModule), canActivate: [segGuard],
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./donor/comentarios/comentarios.module').then(m => m.ComentariosModule), canActivate: [segGuard],
  },
  {
    path: 'gestiones',
    loadChildren: () => import('./donor/gestiones/gestiones.module').then(m => m.GestionesModule), canActivate: [segGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('./donor/settings/settings.module').then(m => m.SettingsModule), canActivate: [segGuard],
  },

  // Rutas para Organización
  { path: 'inicio', component: InicioComponent },
  {
    path: 'gestiones',
    loadChildren: () => import('./organizations/gestiones/gestiones.module').then(m => m.GestionesModule), canActivate: [segGuard],
  },
  {
    path: 'proyectos',
    loadChildren: () => import('./organizations/proyectos/proyectos.module').then(m => m.ProyectosModule), canActivate: [segGuard],
  },
  {
    path: 'foros',
    loadChildren: () => import('./organizations/foros/foros.module').then(m => m.ForosModule), canActivate: [segGuard],
  },
  {
    path: 'configuraciones',
    loadChildren: () => import('./organizations/configuraciones/configuraciones.module').then(m => m.ConfiguracionesModule), canActivate: [segGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

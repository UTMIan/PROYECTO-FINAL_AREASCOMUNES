import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // El usuario ha iniciado sesión, permitir el acceso a la ruta
    } else {
      this.router.navigate(['/login']); // Redirigir al usuario al componente de inicio de sesión
      return false; // Evitar el acceso a la ruta
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  constructor(private router: Router) {}

    ocultarNavbar(): boolean {
      // Obtener la URL actual
      const currentUrl = this.router.url;
      
      // Verificar si la URL actual no es la ruta específica
      return currentUrl !== '/Reservas';
  }
}

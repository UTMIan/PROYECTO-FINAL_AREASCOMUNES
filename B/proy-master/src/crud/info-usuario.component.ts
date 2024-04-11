import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/AuthService.service';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrl: './info-usuario.component.css'
})
export class InfoUsuarioComponent implements OnInit{

  nombreUsuario: string = '';
  correoUsuario: string = '';
  isAdmin: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user && user.cuatrimestre === 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
    // Suscribirse al observable del usuario actual
    this.authService.getUsuarioActual().subscribe(usuario => {
      if (usuario) {
        // Si hay un usuario autenticado, asigna su nombre a la variable nombreUsuario
        this.nombreUsuario = usuario.nombre;
        this.correoUsuario = usuario.email;
      } else {
        // Si no hay usuario autenticado, puedes asignar un valor predeterminado o manejarlo según tu lógica
        this.nombreUsuario = 'Usuario no autenticado';
      }
    });
  }
  
  logout() {
    this.authService.logout();
  }
}

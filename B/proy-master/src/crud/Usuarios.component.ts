import { Component, OnInit } from '@angular/core';
import { UsuariosModel } from '../models/Usuarios.model';
import Swal from 'sweetalert2';
import { UsuariosService } from '../services/Usuarios.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-Usuarios',
  templateUrl: './Usuarios.component.html',
  styleUrls: ['./Usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  mostrarActualizar: boolean = false;
  usuariosAll: UsuariosModel[] = [];
  id: number = 0;
  busqueda: string = '';
  searchTerm: string = '';
  searchText: string = '';
  usuarios: any[] = [];
  private dataSubscription!: Subscription;

  constructor(private readonly UsuariosService: UsuariosService) { }

  async ngOnInit() {
    this.usuariosAll = await this.UsuariosService.getUsuarios();
    this.createDataObservable();
  }


  private createDataObservable() {
    const dataObservable = new Observable<UsuariosModel[]>((observer) => {
      const fetchData = async () => {
        try {
          const data = await this.UsuariosService.getUsuarios();
          observer.next(data);
        } catch (error) {
          observer.error(error);
        }
      };
      const interval = setInterval(fetchData, 1000);
      return () => {
        clearInterval(interval);
      };
    });

    this.dataSubscription = dataObservable.subscribe({
      next: (data) => {
        this.usuariosAll = data;
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          text: error.error.msg
        });
      }
    });
  }




  obtenerUsuarios() {
    this.UsuariosService.getUsuarios()
      .then((response: any) => {
        this.usuariosAll = response.cont.usuariosAll;
      })
      .catch((error: any) => {
        Swal.fire({
          icon: "error",
          text: error.error.msg
        });
      });
  }

  actualizar(idUsuarios: any) {
    this.id = idUsuarios;
    this.mostrarActualizar = true;
  }

  restableceRegistro() {
    this.mostrarActualizar = false;
    this.id;
    this.obtenerUsuarios();
  }

  eliminar(usuarios: UsuariosModel) {
    Swal.fire({
      icon: "question",
      title: `Are you sure to delete?`,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: "Cancel"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.UsuariosService.deleteUsuarios(usuarios.email)
          .then((response: any) => {
            Swal.fire({
              icon: "info",
              text: "Successfully removed"
            });
            this.obtenerUsuarios();
          })
          .catch((error: any) => {
            Swal.fire({
              icon: "error",
              text: "Error updating Usuarios."
            });
          })
      }
    })
  }


  buscar() {
    if (this.searchText === '') {
      this.usuariosAll = this.usuarios;
    } else {
      // Filtra los empleados según el texto de búsqueda
      this.usuariosAll = this.usuarios.filter(usuarios =>
        usuarios.email.toLowerCase().includes(this.searchText.toLowerCase())
      )
    }
  }
}
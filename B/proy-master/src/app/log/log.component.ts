import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservasModel } from 'src/models/Reservas.model';
import Swal from 'sweetalert2';
import { ReservasService } from 'src/services/Reservas.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/services/AuthService.service';
import { AreasComunesModel } from 'src/models/AreasComunes.model';
import { AreasComunesService } from 'src/services/AreasComunes.service';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  
 
  mostrarActualizar: boolean = false;
  reservasAll: ReservasModel[] = [];
  id: number = 0;
  busqueda: string = '';
  searchTerm: string = '';
  searchText: string = '';
  reservas: any[] = [];
  private dataSubscription!: Subscription;
  isAdmin: boolean = false; // Variable para indicar si el usuario es administrador
  areasComunes: AreasComunesModel[] = [];

  constructor(
    private readonly ReservasService: ReservasService, 
    public authService: AuthService,
    private readonly areasComunesService: AreasComunesService
  ) { }


  async ngOnInit() {
    await this.obtenerReservas();
    await this.obtenerAreasComunes();
    this.authService.currentUser.subscribe(user => {
      if (user && user.cuatrimestre === 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
    this.reservasAll = await this.ReservasService.getReservas();
    this.createDataObservable();
  }
  logout() {
    this.authService.logout();
  }
  
  obtenerAreasComunes() {
    // Llama al servicio para obtener las áreas comunes
    this.areasComunesService.getAreasComunes()
      .then((response: any) => {
        this.areasComunes = response; // Asigna las áreas comunes a la propiedad
      })
      .catch((error: any) => {
        Swal.fire({
          icon: "error",
          text: error.error.msg
        });
      });
  }

  // Dentro de tu componente TypeScript
obtenerNombreArea(areaID: number): string {
  const area = this.areasComunes.find(area => area.id === areaID);
  return area ? area.nombre || '' : '';
}

  private createDataObservable() {
    const dataObservable = new Observable<ReservasModel[]>((observer) => {
      const fetchData = async () => {
        try {
          const data = await this.ReservasService.getReservas();
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
        this.reservasAll = data;
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          text: error.error.msg
        });
      }
    });
  }

  obtenerReservas() {
    this.ReservasService.getReservas()
      .then((response: any) => {
        this.reservasAll = response.cont.reservasAll;
      })
      .catch((error: any) => {
        Swal.fire({
          icon: "error",
          text: error.error.msg
        });
      });
  }

  actualizar(idReservas: any) {
    this.id = idReservas;
    this.mostrarActualizar = true;
  }

  restableceRegistro() {
    this.mostrarActualizar = false;
    this.id;
    this.obtenerReservas();
  }
   eliminar(reservas: ReservasModel)
    {
    
    Swal.fire({
      icon: "question",
      title: `¿Estás seguro de eliminar?`,
      showCancelButton: true,
      confirmButtonText: 'yes',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.ReservasService.deleteReservas(reservas.id )
          .then((response: any) => {
            Swal.fire({
              icon: "info",
              text: "Eliminado exitosamente"
            });
            this.obtenerReservas();
          })
          .catch((error: any) => {
            Swal.fire({
              icon: "error",
              text: "Error al eliminar la reserva."
            });
          })
      }
    })
  }
  
  buscar() {
    if (this.searchText === '') {
      this.reservasAll = this.reservas;
    } else {
      // Filtra los empleados según el texto de búsqueda
      this.reservasAll = this.reservas.filter(reservas =>
        reservas.iD.toLowerCase().includes(this.searchText.toLowerCase())
      )
    }
  }
}
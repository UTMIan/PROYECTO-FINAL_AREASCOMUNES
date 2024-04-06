import { Component, OnInit } from '@angular/core';
import { ReservasModel } from '../models/Reservas.model';
import Swal from 'sweetalert2';
import { ReservasService } from '../services/Reservas.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-Reservas',
  templateUrl: './Reservas.component.html',
  styleUrls: ['./Reservas.component.css']
})
export class ReservasComponent implements OnInit {

  mostrarActualizar: boolean = false;
  reservasAll: ReservasModel[] = [];
  id: number = 0;
  busqueda: string = '';
  searchTerm: string = '';
  searchText: string = '';
  reservas: any[] = [];
  private dataSubscription!: Subscription;

  constructor(private readonly ReservasService: ReservasService) { }

  async ngOnInit() {
    this.reservasAll = await this.ReservasService.getReservas();
    this.createDataObservable();
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
    console.log("Actualizar método llamado");
    this.id = idReservas;
    this.mostrarActualizar = true;
    console.log("mostrarActualizar:", this.mostrarActualizar);
  }
  restableceRegistro() {
    this.mostrarActualizar = false;
    this.id;
    this.obtenerReservas();
  }

  eliminar(reservas: ReservasModel) {
    Swal.fire({
      icon: "question",
      title: `Are you sure to delete?`,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: "Cancel"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.ReservasService.deleteReservas(reservas.id)
          .then((response: any) => {
            Swal.fire({
              icon: "info",
              text: "Successfully removed"
            });
            this.obtenerReservas();
          })
          .catch((error: any) => {
            Swal.fire({
              icon: "error",
              text: "Error updating Reservas."
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
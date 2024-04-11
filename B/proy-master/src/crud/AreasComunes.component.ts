import { Component, OnInit } from '@angular/core';
import { AreasComunesModel } from '../models/AreasComunes.model';
import Swal from 'sweetalert2';
import { AreasComunesService } from '../services/AreasComunes.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-AreasComunes',
  templateUrl: './AreasComunes.component.html',
  styleUrls: ['./AreasComunes.component.css']
})
export class AreasComunesComponent implements OnInit {

mostrarActualizar: boolean = false;
  areascomunesAll: AreasComunesModel[] = [];
  id: number= 0;
  busqueda: string = '';
 searchTerm: string = '';
  searchText: string = '';
areascomunes: any[]=[];
private dataSubscription!: Subscription;

  constructor(private readonly AreasComunesService: AreasComunesService) { }

  async ngOnInit() {
    this.areascomunesAll = await this.AreasComunesService.getAreasComunes();
    this.createDataObservable();
  }


 private createDataObservable() {
    const dataObservable = new Observable<AreasComunesModel[]>((observer) => {
      const fetchData = async () => {
        try {
          const data = await this.AreasComunesService.getAreasComunes();
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
        this.areascomunesAll = data;
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          text: error.error.msg
        });
      }
    });
  }




  obtenerAreasComunes() {
    this.AreasComunesService.getAreasComunes()
    .then((response: any) => {
      this.areascomunesAll = response.cont.areascomunesAll;
    })
    .catch((error: any) => {
      Swal.fire({
        icon: "error",
        text: error.error.msg
      });
    });
  }

  actualizar(idAreasComunes: any) {
    console.log("Actualizar método llamado");
    this.id = idAreasComunes;
    this.mostrarActualizar = true;
    console.log("mostrarActualizar:", this.mostrarActualizar);
  }

  restableceRegistro(){
    this.mostrarActualizar = false;
    this.id;
            this.obtenerAreasComunes();
        }

        eliminar(areascomunes: AreasComunesModel)
        {
            Swal.fire({
            icon: "question",
    title: `Are you sure to delete?`,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: "Cancel"
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed)
            {
                this.AreasComunesService.deleteAreasComunes(areascomunes.id)
                .then((response: any) => {
                    Swal.fire({
                    icon: "info",
            text: "Successfully removed"
                    });
            this.obtenerAreasComunes();
        })
        .catch((error: any) => {
          Swal.fire({
            icon: "error",
            text: "Error updating AreasComunes."
          });
        })
      }
    })
  }


buscar(){
if (this.searchText === '') {
      this.areascomunesAll = this.areascomunes;
    } else {
      // Filtra los empleados según el texto de búsqueda
      this.areascomunesAll = this.areascomunes.filter(areascomunes => 
        areascomunes.iD.toLowerCase().includes(this.searchText.toLowerCase())
        )}
      }
    }
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservasModel } from '../models/Reservas.model';
import { ReservasService } from '../services/Reservas.service';
import Swal from 'sweetalert2';
import { AreasComunesModel } from 'src/models/AreasComunes.model';
import { AreasComunesService } from 'src/services/AreasComunes.service';

@Component({
    selector: 'app-Reservas-detail',
    templateUrl: './Reservas-detail.component.html',
    styleUrls: ['./Reservas-detail.component.css']
})

export class ReservasDetailComponent implements OnInit {

    mostrarActualizar: boolean = false;
    areascomunesAll: AreasComunesModel[] = [];
    id: number = 0;
    busqueda: string = '';
    searchTerm: string = '';
    searchText: string = '';
    areascomunes: any[] = [];

    @Input() ID: number = 0;
    isNew: boolean = false;

    reservas: ReservasModel = new ReservasModel();
    @Output() emitChange: EventEmitter<any> = new EventEmitter();

    constructor(private readonly ReservasService: ReservasService, private readonly AreasComunesService: AreasComunesService) { }

    async ngOnInit(): Promise<void> {
        this.areascomunesAll = await this.AreasComunesService.getAreasComunes();
        
        this.isNew = !this.ID;
    
        console.log(this.isNew);
        if (!this.isNew) {
            try {
                const response = await this.ReservasService.getReservasById(this.ID);
                this.reservas = response; // Ajusta esta línea según la estructura de datos que devuelve getReservasById
            } catch (error) {
                console.error(error);
            }
        }
    }

    submitReservas(forma: NgForm) {
        if (this.isNew) {
            this.ReservasService.postReservas(this.reservas)
                .then((response: any) => {
                    Swal.fire({
                        icon: "success",
                        text: "Reservas has been successfully registered"
                    });
                    // forma.reset();
                    this.emitChange.emit();
                })
                .catch((error: any) => {
                    Swal.fire({
                        icon: "error",
                        text: "An error has occurred to register Reservas"
                    });
                });
        } else {

            this.ReservasService.putReservas(this.reservas, this.ID)
                .then((response: any) => {
                    Swal.fire({
                        icon: "success",
                        text: "Reservas has been successfully updated."
                    });
                    this.emitChange.emit();
                })
                .catch((error: any) => {
                    Swal.fire({
                        icon: "error",
                        text: "An error has occurred to update Reservas"
                    });
                });
        }

    }

    limpiarForm(forma: NgForm) {
        forma.reset();
    }

}

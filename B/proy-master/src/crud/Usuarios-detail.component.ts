import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosModel } from '../models/Usuarios.model';
import { UsuariosService } from '../services/Usuarios.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-Usuarios-detail',
    templateUrl: './Usuarios-detail.component.html',
    styleUrls: ['./Usuarios-detail.component.css']
})
export class UsuariosDetailComponent implements OnInit {
    @Input() id: number = 0;
    isNew: boolean = false;

    usuarios: UsuariosModel = new UsuariosModel();
    @Output() emitChange: EventEmitter<any> = new EventEmitter();
    constructor(private readonly UsuariosService: UsuariosService) { }

    ngOnInit(): void {

        this.isNew = !this.id;

        console.log(this.isNew);
        if (!this.isNew) {
            this.UsuariosService.getUsuariosById(this.id)
                .then((response: any) => {
                    this.usuarios = response.cont.Usuarios;
                })
                .catch(() => { });
        }
    }

    submitUsuarios(forma: NgForm) {
        if (this.isNew) {
            this.UsuariosService.postUsuarios(this.usuarios)
                .then((response: any) => {
                    Swal.fire({
                        icon: "success",
                        text: "Usuarios has been successfully registered"
                    });
                    // forma.reset();
                    this.emitChange.emit();
                })
                .catch((error: any) => {
                    Swal.fire({
                        icon: "error",
                        text: "An error has occurred to register Usuarios"
                    });
                });
        } else {

            this.UsuariosService.putUsuarios(this.usuarios, this.id)
                .then((response: any) => {
                    Swal.fire({
                        icon: "success",
                        text: "Usuarios has been successfully updated."
                    });
                    this.emitChange.emit();
                })
                .catch((error: any) => {
                    Swal.fire({
                        icon: "error",
                        text: "An error has occurred to update Usuarios"
                    });
                });
        }

    }

    limpiarForm(forma: NgForm) {
        forma.reset();
    }

}

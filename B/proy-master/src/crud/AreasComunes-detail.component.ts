import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AreasComunesModel } from '../models/AreasComunes.model';
import { AreasComunesService } from '../services/AreasComunes.service';
import Swal from 'sweetalert2';

@Component({
 selector: 'app-AreasComunes-detail',
  templateUrl: './AreasComunes-detail.component.html',
  styleUrls: ['./AreasComunes-detail.component.css']
})
export class AreasComunesDetailComponent implements OnInit {
@Input() ID: number = 0;
        isNew: boolean = false;

        areascomunes: AreasComunesModel = new AreasComunesModel();
            @Output() emitChange: EventEmitter < any > = new EventEmitter();
            constructor(private readonly AreasComunesService: AreasComunesService) { }

  ngOnInit() : void {
    
    this.isNew = !this.ID;

console.log(this.isNew);
    if(!this.isNew){
      this.AreasComunesService.getAreasComunesById(this.ID)
        .then((response: any) => {
          this.areascomunes = response.cont.AreasComunes;
        })
        .catch(() => {});
    }
  }

  submitAreasComunes(forma: NgForm){
    if (this.isNew)
    {
        this.AreasComunesService.postAreasComunes(this.areascomunes)
        .then((response: any) => {
            Swal.fire({
            icon: "success",
        text: "AreasComunes has been successfully registered"
            });
            // forma.reset();
            this.emitChange.emit();
        })
    .catch ((error: any) => {
            Swal.fire({
            icon: "error",
        text: "An error has occurred to register AreasComunes"
            });
        });
        } else
        {

            this.AreasComunesService.putAreasComunes(this.areascomunes, this.ID)
            .then((response: any) => {
                Swal.fire({
                icon: "success",
        text: "AreasComunes has been successfully updated."
                });
                this.emitChange.emit();
            })
    .catch ((error: any) => {
                Swal.fire({
                icon: "error",
        text: "An error has occurred to update AreasComunes"
                });
            });
            }

        }

        limpiarForm(forma: NgForm){
            forma.reset();
        }

    }
    
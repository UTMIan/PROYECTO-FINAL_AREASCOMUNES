
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment.prod';
import {ReservasModel} from '../models/Reservas.model';
@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  EXAMENUrl: string = `${environment.baseUrl}/Reservas`;
  constructor(private readonly http: HttpClient) {}

  getReservasById(ID: number) {
    return lastValueFrom(this.http.get<ReservasModel>(`${this.EXAMENUrl}/${ID}`));
  }

  getReservas(): Promise<ReservasModel[]> {
    return lastValueFrom(this.http.get<ReservasModel[]>(`${this.EXAMENUrl}`));
  }

  postReservas(reservas: ReservasModel) {
    
    return lastValueFrom(this.http.post(`${this.EXAMENUrl}`, reservas));
  }
  putReservas(reservas: ReservasModel, ID: number) { 
    return lastValueFrom(this.http.put(`${this.EXAMENUrl}`, reservas));
  }

  deleteReservas(ID: any) {
    return lastValueFrom(this.http.delete(`${this.EXAMENUrl}/${ID}`));
  }
  
}